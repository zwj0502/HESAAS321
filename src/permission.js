import router from "@/router";
import store from '@/store'
const wheteelist = ['/login', '/404']
// 任何一个路由跳转 都会进入这个全局前置守卫
router.beforeEach(async(to, from, next) => {
     // ...
  // to 将要进入的目标
  // from 当前导航正要离开的路由
  // next  Function 
  // next() 意味着都 当前这个钩子 结束 进入下一个
  // next(false) 中断当前的导航
  // next('/') 或者 next({ path: '/' })  跳转到一个不同的地址   
  //  当前的导航被中断，然后进行一个新的导航
    if (store.getters.token) {
        if (!store.getters.userId) { 
            await store.dispatch('user/getUserinfo')
        }
        if (to.path === '/login') {
            next('/')
        } else {
            next()
        }
    } else { 
        if (wheteelist.includes(to.path)) {
            next()
        } else { 
            next('/login')
        }
    }
})