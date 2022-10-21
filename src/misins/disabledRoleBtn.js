export default {
  methods: {
    disabledRole(disabledId) {
      // console.log(this.$store.state.user.userinfo)
      return !this.$store.state.user.userinfo.roles.points.includes(disabledId)
    }
  }
}
