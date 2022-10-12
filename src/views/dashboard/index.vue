<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <svg-icon icon-class="eye-open" />
    <UploadExcel :before-uploadd="beforeUploadd" :on-success="handleSuccess" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UploadExcel from '@/components/UploadExcel/index.vue'
export default {
  name: 'Dashboard',
  components: {
    UploadExcel
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    handleSuccess(data) {
      console.log('data', data)
    },
    beforeUploadd(file) {
      console.log(file)
      if (file.size > 1024) {
        this.$message.error('to Big')
        return false
      }
      return true
    }
  }
  // created() {
  // this.$store.dispatch('user/getUserInfo')
  // }
}
</script>

  <style lang="scss" scoped>
  .dashboard {
   &-container {
   margin: 30px;
   }
   &-text {
    font-size: 30px;
    line-height: 46px;
   }
  }
  </style>

