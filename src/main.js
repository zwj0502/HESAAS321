import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
// import { imgerror } from '@/directives'
// Vue.directive('imgerror',imgerror)
import * as directives from '@/directives'
Object.keys(directives).forEach(ele => {
  Vue.directive(ele, directives[ele])
})
import * as filters from '@/filters' // 引入工具类
// 注册全局的过滤器
Object.keys(filters).forEach(key => {
  // 注册过滤器
  Vue.filter(key, filters[key])
})
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }
// import PageTools from './PageTools'
// import UploadExcel from './UploadExcel'
// export default {
//   install(Vue) {
//     Vue.component('PageTools', PageTools) // 注册工具栏组件
//     Vue.component('UploadExcel', UploadExcel) // 注册导入excel组件
//   }
// }
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
