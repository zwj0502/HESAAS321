<template>

  <el-row type="flex" justify="space-between" align="middle" style="width: 100%">
    <el-col>
      <!-- 左侧内容 -->
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <el-dropdown @command="handleCommand">
            <span>操作<i class="el-icon-arrow-down" /></span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="isRot" command="edit">编辑子部门</el-dropdown-item>
              <el-dropdown-item v-if="isRot" command="del">删除子部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>

      <!-- 右侧内容 -->
    </el-col>
  </el-row>
</template>

<script>
export default {

  props: {
    treeNode: {
      type: Object, // 对象类型
      required: true // 要求对方使用您的组件的时候 必须传treeNode属性 如果不传 就会报错
    },
    isRot: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    handleCommand(type) {
      if (type === 'add') {
        // 新增
        console.log(111)

        this.$emit('addDepts', this.treeNode)
      } else if (type === 'edit') {
        // 编辑
      } else {
        // 删除
      }
    }
  }
}
</script>

<style>

</style>
