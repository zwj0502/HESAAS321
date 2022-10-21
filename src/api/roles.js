import request from '@/utils/request'
/**
 * 获取所有角色列表
 * @returns
 */
export const rolesApi = () => {
  return request({
    url: '/sys/role'

  })
}
/**
 * 获取角色权限详情
 * @returns
 */
export const getrolesApi = (id) => {
  return request({
    url: `/sys/role/${id}`
  })
}
/**
 * 给角色分配权限
 * @param {*} data
 * @returns
 */
export const setrolesApi = (data) => {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}
