<template>
  <div>
    <i class="el-icon-full-screen" @click="screenFullBtn" />
  </div>
</template>

<script>
import screenFull from 'screenfull'
export default {
  methods: {
    screenFullBtn() {
      if (!screenFull.isEnabled) return this.$message.error('大傻逼')
      screenFull.toggle()
    }

  }
}
</script>

<style>

</style>
