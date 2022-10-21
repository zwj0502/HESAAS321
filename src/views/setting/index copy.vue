<template>
  <div class="app-container">
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark" />
              <el-button :disabled="disabledRole('roles-add')" type="primary" style="margin-left:10px" size="small" icon="el-icon-plus" @click="visible = true">新建角色</el-button>
            </el-col>
          </el-row>
          <el-table
            v-loading="loading"
            :data="rowsList"
            style="width: 100%"
          >
            <el-table-column
              type="index"
              label="序号"
              width="120"
            />
            <el-table-column
              label="角色名称"
              width="240"
              prop="name"
            />
            <el-table-column
              label="描述"
              prop="description"
            />
            <el-table-column label="操作">
              <template slot-scope="{row}">
                <el-button size="small" type="success" @click="setpermissions(row.id)">分配权限</el-button>
                <el-button :disabled="disabledRole('roles.add')" size="small" type="primary" @click="editBtn(row)">编辑</el-button>
                <el-button :disabled="disabledRole('roles.add')" size="small" type="danger" @click="delRow(row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-row type="flex" justify="end" align="middle" style="height:60px;">
            <!-- // background   添加背景
            // current-page 当前的页面
            // page-size    每一页展示的条数
            // page-sizes   每页显示个数选择器的选项设置
            // total        总共多少条数据
            // layout       布局
            // current-change 改变当前页码的触发（current-page 值改变的时候触发）
            // size-change 改变页面的数据条数的时候 触发（page-size 值改变的时候触发） -->
            <el-pagination
              v-if="total > 0"
              background
              layout="prev, pager, next,sizes"
              :total="total"
              :current-page.sync="page.page"
              :page-size.sync="page.pagesize"
              :page-sizes="[2,5,10,15]"
              @current-change="getRoleList"
              @size-change="getRoleList"
            />
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          />
          <el-form label-width="120px" style="margin-top:50px">
            <el-form-item label="公司名称">
              <el-input v-model="CompanyInfo.name" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input v-model="CompanyInfo.companyAddress" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="CompanyInfo.mailbox" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="CompanyInfo.remarks" type="textarea" :rows="3" disabled style="width:400px" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <addRole ref="addRole" :visible.sync="visible" @createAdd="getRoleList" />
    <addSetpermissions ref="addSetpermissions" :dialog-visible.sync="dialogVisible" />
  </div>
</template>

<script>
import addRole from './components/addRole.vue'
import { getRoleList, deleteRole, getCompanyInfo } from '@/api/setting'
import addSetpermissions from './components/addSetpermissions.vue'
import disabledRoleBtn from '@/misins/disabledRoleBtn'
export default {
  name: 'HrsaasIndex',
  components: {
    addRole, addSetpermissions
  },
  mixins: [disabledRoleBtn],
  data() {
    return {
      activeName: 'first',
      page: {
        page: 1,
        pagesize: 10
      },
      total: 0,
      rowsList: [],
      loading: false,
      visible: false,
      CompanyInfo: [],
      dialogVisible: false
    }
  },
  // computed: {
  //   disabledRole() {
  //     return function(disabledRoleId) {
  //       return !this.$store.state.user.userinfo.roles.points.includes(disabledRoleId)
  //     }
  //   }
  // },

  mounted() {
    this.getRoleList()
    this.getCompany()
  },
  methods: {
    async getRoleList() {
      try {
        this.loading = true
        const { total, rows } = await getRoleList(this.page)
        // total 大于0 并且 rows的length === 0 这种情况并不是正在的没有数据 是有的，要重新发起请求
        if (total > 0 && rows.length === 0) {
          this.page.page = this.page.page - 1
          this.getRoleList()
        }
        this.rowsList = rows
        this.total = total
      } catch (error) {
        MessageChannel.error(error)
      } finally {
        this.loading = false
      }
    },
    addRole() {
      this.visible = true
    },
    editBtn(row) {
      this.$refs.addRole.formData = { ...row }
      this.visible = true
    },
    // newPropo() {

    // }
    async delRow(id) {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await deleteRole(id)
        this.getRoleList()
      } catch (error) {
        console.log(error)
      }
    },
    async getCompany() {
      const res = await getCompanyInfo(this.$store.getters.companyId)
      console.log(res)
      this.CompanyInfo = res
    },
    setpermissions(id) {
      this.$refs.addSetpermissions.getpermissionRleid(id)
      this.dialogVisible = true
    }
    // disabledRole(disabledId) {
    //   // console.log(this.$store.state.user.userinfo)
    //   return !this.$store.state.user.userinfo.roles.points.includes(disabledId)
    // }
  }
}
</script>

<style lang="scss" scoped>
// zzz{
//   line-height: ;
// }
</style>
