<template>
  <div>
    <template>
      <el-dialog
        title="新增角色"
        width="50%"
        :visible.sync="visible"
        :before-close="handleClsoe"
      >
        <el-form
          ref="roleDialogForm"
          :model="formData"
          label-width="80px"
        >
          <el-form-item
            prop="name"
            label="角色"
            :rules="[{required:true,message:'名字不能为空',trigger:'blur'}]"
          >
            <el-input v-model="formData.name" />
          </el-form-item>

          <el-form-item label="描述">
            <el-input v-model="formData.description" type="textarea" row="3" />
          </el-form-item>
        </el-form>
        <el-row slot="footer" type="flex" justify="center" align="middle" class="dialog-footer">
          <el-button @click="handleClsoe">取 消</el-button>
          <el-button type="primary" :loading="loading" @click="addRoleBtn">确 定</el-button>
        </el-row>
      </el-dialog>
    </template>

  </div>
</template>

<script>
import { addRoleList } from '@/api/setting'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        name: '',
        description: ''
      },
      loading: false

    }
  },
  methods: {
    handleClsoe() {
      this.$emit('update:visible', false)
      this.$refs.roleDialogForm.resetFields()
      this.formData.description = ''
    },
    async addRoleBtn() {
      try {
        await this.$refs.roleDialogForm.validate()
        this.loading = true
        await addRoleList(this.formData)
        this.$refs.roleDialogForm.resetFields()
        this.$message.success('新增成功 ')
        this.handleClsoe()
        this.$emit('createAdd')
      } catch (error) {
        this.$Message.error('error')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>

</style>
