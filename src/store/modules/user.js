import { login } from '@/api/login'
import { getUserinfo,getUserDetailById } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: null,
    userinfo: {}
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
    }
  },
  actions: {
    async loginActions({ commit }, loginData) {
      const data = await login(loginData)
      console.log(data)
      commit('SET_TOKEN', data)
    },
    async getUserinfo({ commit }) {
      // console.log(1);
      const res = await getUserinfo()
      const res1 = await getUserDetailById(res.userId)
      const rules = {...res,...res1}
      console.log(res);
      commit('SET_USER_INFO', rules)
      return JSON.parse(JSON.stringify(res))

    }
  }
}
