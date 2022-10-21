<template>
  <el-dialog
    title="提示"
    :visible="dialogVisible"
    width="50%"
    @open="oPenbtn"
    @close="hanrdclose"
  >
    <el-tree ref="tree" node-key="id" :default-checked-keys="defaultChange" :data="data" show-checkbox default-expand-all :props="defaultProps" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:dialogVisible',false)">取 消</el-button>
      <el-button type="primary" @click="setrolesApiBtn">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getpermissionApi } from '@/api/prrmission'
import { tranListDepar } from '@/utils/tranListDepar'
import { getrolesApi, setrolesApi } from '@/api/roles'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      data: [],
      defaultProps: {
        label: 'name'
      },
      defaultChange: [],
      roleId: ''
    }
  },
  methods: {
    hanrdclose() {
      this.$emit('update:dialogVisible', false)
    //   this.defaultChange = []
    },
    async oPenbtn() {
      // 获取所有权限列表
      const data = await getpermissionApi()
      //   console.log(data)
      this.data = tranListDepar(data, '0')
      //   console.log(123)
    //   getpermissionRleid()
    },
    // 获取当前角色已有的权限
    async getpermissionRleid(id) {
    //   console.log(id)
      this.roleId = id
      const res = await getrolesApi(id)
      //   console.log(res)
      this.defaultChange = res.permIds
    },
    async setrolesApiBtn() {
    //   if (!this.defaultChange.length) return this.$message.error('分配权限不能为空')
    // 若节点可被选择（即 show-checkbox 为 true），则返回目前被选中的节点的 key 所组成的数组
      const permIds = this.$refs.tree.getCheckedKeys()
      await setrolesApi({ id: this.roleId, permIds })
      this.$message.success('分配成功')
      this.hanrdclose()
    }
  }
}
</script>

<style>

</style>
