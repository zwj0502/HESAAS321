<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="always">
        <template>
          <el-tabs v-model="activeName" @tab-click="tabClick">
            <el-tab-pane lazy label="登录账户设置" name="first">
              <el-form ref="form" :model="activeInfo" label-width="80px" :rules="rules">
                <el-form-item label="姓名" prop="username">
                  <el-input v-model.trim="activeInfo.username" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input v-model.trim="activeInfo.password" type="password" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="updateemployees">更新</el-button>
                </el-form-item>
              </el-form></el-tab-pane>
            <el-tab-pane lazy label="个人详情" name="second"><userInfo /></el-tab-pane>
            <el-tab-pane lazy label="岗位信息" name="third"><jodInfo /></el-tab-pane>
          </el-tabs>
        </template>
      </el-card>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import userInfo from './components/user-info.vue'
import jodInfo from './components/job-info.vue'
import { getUserDetailById, updateUserDetailById } from '@/api/user'
export default {
  components: {
    userInfo, jodInfo
  },
  data() {
    return {
      activeName: Cookies.get('activeName') || 'first',
      activeInfo: {},
      rules: {
        username: [
          { required: true, message: '请输入员工名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入员工密码', trigger: 'blur' },
          { min: 6, message: '长度最少6位', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getUserDetail()
  },
  methods: {
    async getUserDetail() {
      const res = await getUserDetailById(this.$route.params.id)
      console.log(res)
      this.activeInfo = res
    },
    async updateemployees() {
      try {
        await this.$refs.form.validate()
        await updateUserDetailById(this.activeInfo)
        this.$message.success('更新成功')
      } catch (error) {
        this.$message.error(error)
      }
    },
    tabClick() {
      Cookies.set('activeName', this.activeName)
    }
  }
}
</script>

<style>

</style>
