
import request from '@/utils/request'
/**
 * 获取所有权限
 * @returns
 */
export const getpermissionApi = () => {
  return request({
    url: '/sys/permission'

  })
}
/**
 * 添加权限
 * @returns
 */
export const savepermissionApi = (data) => {
  return request({
    url: '/sys/permission',
    method: 'post',
    data
  })
}

/**
 * 删除权限
 * @returns
 */
export const deletepermissionApi = (id) => {
  return request({
    url: `/sys/permission/${id}`,
    method: 'delete'
  })
}
