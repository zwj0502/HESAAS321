<template>
  <div class="app-container">
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark" />
              <el-button type="primary" style="margin-left:10px" size="small" icon="el-icon-plus" @click="visible = true">新建角色</el-button>
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
              <el-button size="small" type="success">分配权限</el-button>
              <el-button size="small" type="primary">编辑</el-button>
              <el-button size="small" type="danger">删除</el-button>
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
        <el-tab-pane label="公司信息" name="second">公司信息</el-tab-pane>
      </el-tabs>
    </el-card>
    <addRole :visible.sync="visible" :create-add="getRoleList" />

  </div>
</template>

<script>
import addRole from './components/addRole.vue'
import { getRoleList } from '@/api/setting'
export default {
  name: 'HrsaasIndex',
  components: {
    addRole
  },
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
      visible: false
    }
  },

  mounted() {
    this.getRoleList()
  },

  methods: {
    async getRoleList() {
      try {
        this.loading = true
        const { total, rows } = await getRoleList(this.page)
        this.rowsList = rows
        this.total = total
      } catch (error) {
        MessageChannel.error(error)
      } finally {
        this.loading = false
      }
    }
    // newPropo() {

    // }
  }
}
</script>

<style lang="scss" scoped>
// zzz{
//   line-height: ;
// }
</style>
