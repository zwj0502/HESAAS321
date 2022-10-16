<template>
  <div class="dashboard-container">
    <UploadImg @onPageimg="onPageimg" />
    <UploadImg @onPageimg="onPageimg1" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UploadImg from '@/components/UploadImg/index.vue'
export default {
  name: 'Dashboard',
  components: {
    UploadImg
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
    },
    onPageimg(node) {
      console.log('123', node)
    },
    onPageimg1(node) {
      console.log('456', node)
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

