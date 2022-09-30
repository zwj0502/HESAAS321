/**
 *  封装一个函数 找到第一层数据
 *  定义好函数，确定形参，两个 list 需要处理的数据  rootVale： 父元素的id
 *  定义好arr 用来接收 找到的元素
 *	返回 arr
 **/
export function tranListDepar(list, rootVale) {
  const arr = []
  list.forEach(ele => {
    if (ele.pid === rootVale) {
      const children = tranListDepar(list, ele.id)
      if (children.length) {
        ele.children = children
      }
      arr.push(ele)
    }
  })
  return arr
}
