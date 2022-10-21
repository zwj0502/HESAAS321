// import { bind } from 'core-js/core/function'
import store from '@/store'
export const imgerror = {
  inserted(el, binding, vnode) {
    console.log(el)
    console.log(binding)
    console.log(vnode)
    el.onerror = function() {
      // 当图片出现异常的时候 会将指令配置的默认图片设置为该图片的内容
      // dom可以注册error事件
      el.src = binding.value // 这里不能写死
    }
  }
}

export const isHot = {
  // 指令所在元素插入到父节点时触发
  inserted(el, binding) {
    console.log(binding.value)
    const ishot = store.state.user.userinfo.roles.points.includes(binding.value)
    if (ishot) return true
    el.remove()
  },
  // 指令和对应的元素进行绑定
  bind() {

  }
}
