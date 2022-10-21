<template>
  <el-dialog
    title="权限分配"
    :visible="dialogVisibleSet"
    width="50%"
    @close="hanrdclose"
    @open="openBtn"
  >
    <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="item in role" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
    </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:dialogVisibleSet',false)">取 消</el-button>
      <el-button type="primary" @click="setemployeesRolesBtn">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { rolesApi } from '@/api/roles'
import { getUserDetailById, setemployeesRoles } from '@/api/user'
// import { setemployeesRoles } from '@/api/user'
export default {
  name: 'Role',
  props: {
    dialogVisibleSet: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      checkList: [],
      role: [],
      userId: ''
    }
  },
  methods: {
    hanrdclose() {
      this.$emit('update:dialogVisibleSet', false)
    //   this.checkList = []
    },
    async openBtn() {
      const { rows } = await rolesApi()
      this.role = rows
    },
    async getemployessRole(id) {
      this.userId = id
      //   console.log('员工信息')
      //   console.log(id)
      const res = await getUserDetailById(id)
      //   console.log(res)
      this.checkList = res.roleIds || []
    },
    async setemployeesRolesBtn() {
      if (!this.checkList.length) return this.$message.error('不能为空')
      try {
        await setemployeesRoles({ id: this.userId, roleIds: this.checkList })
        this.$message.success('成功')
        this.hanrdclose()
      } catch (error) {
        this.$message.error('失败')
      }
    }
  }
}
</script>

<style>

</style>
