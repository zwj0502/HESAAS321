import { login } from '@/api/login'
import { getUserinfo, getUserDetailById } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: null,
    userinfo: {},
    herateTime: 0
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER_INFO(state, userinfo) {
      state.userinfo = userinfo
    },
    DEL_USER_INFO(state) {
      state.userinfo = {}
    },
    DEL_USER_TOKEN(state) {
      state.token = null
    },
    SET_TIME(state, herateTime) {
      state.herateTime = herateTime
    }
  },
  actions: {
    async loginActions({ commit }, loginData) {
      const data = await login(loginData)
      console.log(data)
      commit('SET_TOKEN', data)
      commit('SET_TIME', new Date().getTime())
    },
    async getUserinfo({ commit }) {
      // console.log(1);
      const res = await getUserinfo()
      const res1 = await getUserDetailById(res.userId)
      const rules = { ...res, ...res1 }
      console.log(res)
      commit('SET_USER_INFO', rules)
      return JSON.parse(JSON.stringify(res))
    },
    logout({ commit }) {
      commit('DEL_USER_INFO')
      commit('DEL_USER_TOKEN')
    }
  }

}
