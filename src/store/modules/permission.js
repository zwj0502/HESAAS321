import { constantRoutes } from '@/router/index'
export default {
  namespaced: true,
  state: {
    routes: []
  },
  mutations: {
    setRoutes(state, payload) {
    //   console.log(123)
      state.routes = [...constantRoutes, ...payload]
    }
  }
}
