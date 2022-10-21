<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :is-show-before="false">
        <template #after>
          <el-button type="primary" @click="dialogVisibleBtn(1,'0')">新增</el-button>
        </template>
      </PageTools>
    </div>
    <el-table
      ref="table"
      :data="tableData"
      style="width: 100%"
      row-key="id"
    >

      <el-table-column
        prop="name"
        label="权限名称"
        width="400"
      >
        <template slot-scope="{row}">
          <div @click="xialaBtn(row)">
            <template v-if="row.type === 1">
              <i class="el-icon-folder-opened" />
              {{ row.name }}
            </template>
            <template v-if="row.type === 2">
              <i style="margin:20px" class="el-icon-document-remove" />
              {{ row.name }}
            </template>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="code"
        label="标识"
        width="400"
      />
      <el-table-column
        prop="description"
        label="描述"
        width="350"
      />
      <el-table-column
        prop="address"
        label="操作"
      >
        <template slot-scope="{row}">
          <el-button v-if="row.type === 1" type="text" @click="dialogVisibleBtn(2,row.id)">添加</el-button>
          <el-button type="text">编辑</el-button>
          <el-button type="text" @click="deleteBtn(row)">删除</el-button>
        </template>

      </el-table-column>
    </el-table>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      @close="hanrdclose"
    >
      <!-- 表单 -->
      <el-form ref="perForm" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="formData.name" style="width:90%" />
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="formData.code" style="width:90%" />
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="formData.description" style="width:90%" />
        </el-form-item>
        <el-form-item label="开启">
          <el-switch
            v-model="formData.enVisible"
            active-value="1"
            inactive-value="0"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="savepermission">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import PageTools from '@/components/PageTools'
import { getpermissionApi, savepermissionApi, deletepermissionApi } from '@/api/prrmission'
import { tranListDepar } from '@/utils/tranListDepar'
export default {
  name: 'HrsaasIndex',
  components: {
    PageTools
  },

  data() {
    return {
      tableData: [],
      dialogVisible: false,
      formData: {
        name: '', code: '', description: '', enVisible: '', type: '', pid: ''
      },
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
      }
    }
  },

  created() {
    this.slatgetpermission()
  },

  methods: {
    async slatgetpermission() {
      console.log(1)
      const res = await getpermissionApi()
      console.log(res)
      this.tableData = tranListDepar(res, '0')
    },
    xialaBtn(row) {
      row.isShow = !row.isShow
      this.$refs.table.toggleRowExpansion(row, row.isShow)
    },
    dialogVisibleBtn(type, pid) {
      this.dialogVisible = true
      this.formData.type = type
      this.formData.pid = pid
    },
    hanrdclose() {
      this.dialogVisible = false
      this.$refs.perForm.resetFields()
      this.formData = {
        name: '', code: '', description: '', enVisible: '', type: '', pid: ''
      }
    },
    async savepermission() {
      this.$refs.perForm.validate(async(valid) => {
        if (!valid) return
      })
      try {
        await savepermissionApi(this.formData)
        this.$message.success('成功')
        this.dialogVisible = false
        this.slatgetpermission()
      } catch (error) {
        this.$message.error(error)
      }
    },
    async deleteBtn({ id }) {
      try {
        await deletepermissionApi(id)
        this.$message.success('删除成功')
        this.slatgetpermission()
      } catch (error) {
        this.$message.error(error)
      }
    }

  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-table__expand-icon{
  display: none !important;
}
</style>
