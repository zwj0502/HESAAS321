<template>
  <div class="app-container">
    <PageTools :type="type" :show-before="showBefore">
      <template #before>
        <span>共166条记录</span>
      </template>
      <template #after>
        <el-button size="small" type="warning" @click="$router.push('/import')">导入</el-button>
        <el-button size="small" type="danger" @click="ExportExcel">导出</el-button>
        <el-button size="small" type="primary" @click="addBtn">新增员工</el-button>
        <addemployee :dialog-visible.sync="dialogVisible" />

      </template>
    </PageTools>
    <!-- 放置表格和分页 -->
    <el-card>
      <el-table v-loading="loading" border :data="list">
        <el-table-column label="序号" sortable="" width="80" type="index" />
        <el-table-column label="头像">
          <template slot-scope="{row}">
            <img style="width:100px;height: 100px;border-radius: 50%;" :src="row.staffPhoto" alt="" @click="dialogVisiblePhotoBtn(row.staffPhoto)">
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="username" />
        <el-table-column label="工号" prop="workNumber" />
        <el-table-column label="聘用形式" prop="formOfEmployment" :formatter="formatEmployment" />
        <el-table-column label="部门" prop="departmentName" />
        <el-table-column label="入职时间" sortable="" align="center">
          <!-- 作用域插槽 -->
          <template slot-scope="{ row }"> {{ row.timeOfEntry | formatDate }}</template>
        </el-table-column>
        <el-table-column label="账户状态" prop="enableState" />
        <el-table-column label="操作" fixed="right" width="280">
          <template slot-scope="{row}">
            <el-button type="text" size="small" @click="Detail(row.id)">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button type="text" size="small" @click="deleteBtn(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row type="flex" justify="end" align="middle" style="height: 60px">
        <el-pagination
          background
          layout="prev, pager, next, sizes, total"
          :current-page.sync="page.page"
          :page-size.sync="page.size"
          :page-sizes="[2,5,10]"
          :total="total"
          @current-change="getEmployeeList"
          @size-change="getEmployeeList"
        />
      </el-row>
    </el-card>
    <el-dialog
      title="图片预览"
      :visible.sync="dialogVisiblePhoto"
      width="30%"
    >
      <canvas ref="canvas" />
    </el-dialog>
  </div>
</template>
<script>
import EmployeeEnum from '@/api/constant/employees'
import PageTools from '@/components/PageTools'
import { getEmployeeList, delEmployee } from '@/api/employees'
import addemployee from './components/add-employee.vue'
import QRCode from 'qrcode'
export default {
  name: 'HrsaasIndex',
  components: {
    PageTools,
    addemployee
  },
  data() {
    return {
      type: 'info',
      showBefore: true,
      page: {
        page: 1,
        size: 10
      },
      list: [],
      total: 0,
      loading: false,
      hireType: EmployeeEnum.employees,
      dialogVisible: false,
      dialogVisiblePhoto: false
    }
  },

  mounted() {
    this.getEmployeeList()
  },

  methods: {
    async getEmployeeList() {
      try {
        this.loading = true
        const { rows, total } = await getEmployeeList(this.page)
        console.log(rows)
        this.list = rows
        this.total = total
      } finally {
        this.loading = false
      }
    },
    formatEmployment(row, column, cellValue) {
      const obj = this.hireType.find(item => item.id === cellValue)
      return obj && obj.value || '非正式'
    },
    addBtn() {
      this.dialogVisible = true
    },
    async deleteBtn(id) {
      try {
        await this.$confirm('您确定删除该员工吗')
        await delEmployee(id)
        this.getEmployeeList()
        this.$message.success('删除员工成功')
      } catch (error) {
        console.log(error)
      }
    },
    async ExportExcel() {
      const { rows } = await getEmployeeList({
        page: 1,
        size: this.total
      })
      console.log(rows)
      const headera = {
        '手机号': 'mobile',
        '姓名': 'username',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      const header = Object.keys(headera)
      const data = rows.map(item => {
        return header.map(h => {
          if (h === '聘用形式') {
            const find = this.hireType.find(hire => {
              return hire.id === item[headera[h]]
            })
            return find ? find.value : '未知'
          }
          return item[headera[h]]
        })
      })
      console.log(data)
      const { export_json_to_excel } = await import('@/wendor/Export2Excel.js')
      export_json_to_excel({
        header, // 表头 必填
        data, // 具体数据 必填
        filename: 'excel-list', // 非必填
        autoWidth: true, // 非必填
        bookType: 'xlsx' // 非必填
      })
    },
    Detail(id) {
      this.$router.push('/employees/Detail/' + id)
    },
    dialogVisiblePhotoBtn(staffPhoto) {
      if (!staffPhoto) return this.$message.error('暂无头像')
      this.dialogVisiblePhoto = true
      this.$nextTick(() => {
        QRCode.toCanvas(this.$refs.canvas, staffPhoto, function(error) {
          if (error) {
            console.error(error)
            console.log('success!')
          }
        })
      })
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
