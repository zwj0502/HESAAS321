<template>
  <div v-loading="loading" class="app-container">
    <el-card>
      <treetools :tree-node="company" :is-rot="false" @addDepts="addDepts" />
    </el-card>
    <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
      <treetools slot-scope="{ data }" :tree-node="data" @addDepts="addDepts" @eitDepts="eitDepts" @deleteBtn="getDepartments" />
    </el-tree>
    <addDepart ref="addDepart" :show-dialog.sync="showDialog" :tree-node="treeNode" @submit="getDepartments" />
  </div>
</template>
<script>
import treetools from './componet/tree-tools.vue'
import { getDepartments } from '@/api/departmennts'
import { tranListDepar } from '@/utils/tranListDepar'
import addDepart from './componet/add-depart.vue'
export default {
  name: 'HrsaasIndex',
  components: {
    treetools,
    addDepart
  },
  data() {
    return {
      defaultProps: {
        label: 'name'
      },
      departs: [],
      company: {},
      showDialog: false,
      treeNode: {},
      loading: false
    }
  },
  mounted() {
    this.getDepartments()
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
    },
    async getDepartments() {
      try {
        this.loading = true
        const { depts, companyName, companyManage } = await getDepartments()
        this.departs = tranListDepar(depts, '')
        this.company = { name: companyName, manager: companyManage, id: '' }
      } finally {
        this.loading = false
      }
    },
    addDepts(node) {
      console.log(123)
      this.showDialog = true
      this.treeNode = node
    },
    eitDepts(node) {
      this.treeNode = node
      this.showDialog = true
      this.$refs.addDepart.formData = { ...node }
    }
  }
}
</script>

<style lang="scss" scoped>
.departments-container {
  width: 500px;
  margin: 20px auto;
  .el-tree {
    .el-tree-node__content {
      // padding-right: 20px;
    }
  }
}
</style>
