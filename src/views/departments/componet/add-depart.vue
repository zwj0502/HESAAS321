<template>
  <!-- 新增部门的弹层 -->
  <el-dialog :title="title" :visible="showDialog" @close="Addclose">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="formAdd" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" @focus="getEmployeeSimple">
          <el-option v-for="item in managerList" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small" @click="submit">确定</el-button>
        <el-button size="small">取消</el-button>
      </el-col>
    </el-row>

  </el-dialog>
</template>

<script>
import { getDepartments } from '@/api/departmennts'
import { getEmployeeSimple, addDepartments, updateDepartments } from '@/api/employees'
export default {
  name: 'Addepart',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    // 部门编码检测
    const checkCode = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      let isRerequst = true
      console.log(depts)
      if (this.formData.id) {
        isRerequst = depts.some(ele => this.formData.id !== ele.id && ele.code === value)
      } else {
        isRerequst = depts.some(ele => ele.code === value)
      }
      isRerequst ? callback(new Error(`${value}已存在`)) : callback()
    }
    // 获取同级部门
    // 部门名称检测
    const checkName = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      // console.log(depts)
      // 编辑模式下
      let Rerequstis = true
      if (this.formData.id) {
        const Rerequst1 = depts.filter(item => item.pid === this.treeNode.pid && item.id !== this.treeNode.id)
        console.log(Rerequst1)
        Rerequstis = Rerequst1.some(ele => ele.name === value)
      } else {
        const Rerequst = depts.filter(item => item.pid === this.treeNode.id)
        //   console.log('Rerequst', Rerequst)
        Rerequstis = Rerequst.some(ele => ele.name === value)
      }
      Rerequstis ? callback(new Error(`${value}已存在`)) : callback()
    }
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      managerList: [],
      rules: {
        name: [
          { required: true, message: '必填 1-50个字符', trigger: 'blur' },
          { min: 1, max: 50, trigger: 'blur' },
          {	validator: checkName, trigger: 'blur' }

        ],
        code: [
          { required: true, message: '必填 1-50个字符', trigger: 'blur' },
          { min: 1, max: 50, trigger: 'blur' },
          {	validator: checkCode, trigger: 'blur' }
        ], manager: [
          { required: true, message: '必填' }

        ], introduce: [
          { required: true, message: '必填 1-300个字符', trigger: 'blur' },
          { min: 1, max: 300, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    title() {
      return this.formData.id ? '编辑模式' : '新增模式'
    }
  },
  //     部门名称（name）：必填 1-50个字符 / 同级部门中禁止出现重复部门
  // 部门编码（code）：必填 1-50个字符 / 部门编码在整个模块中都不允许重复
  // 部门负责人（manager）：必填
  // 部门介绍 ( introduce)：必填 1-300个字符
  methods: {
    Addclose() {
    //   console.log()
      this.$emit('update:showDialog', false)
      this.$refs.formAdd.resetFields()
      this.formData = {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      }
    },
    async getEmployeeSimple() {
      const data = await getEmployeeSimple()
      console.log(data)
      this.managerList = data
    },
    async submit() {
      try {
        await this.$refs.formAdd.validate()
        this.formData.id ? updateDepartments({ ...this.formData }) : addDepartments({ ...this.formData, pid: this.treeNode.id })
        this.$message.success(this.formData.id ? '编辑成功' : '添加成功')
        // this.$parent.getDepartments()
        this.$emit('submit')
        this.Addclose()
      } catch (error) {
        this.$message.error(error)
      }
    }
  }
}
</script>

<style>

</style>
