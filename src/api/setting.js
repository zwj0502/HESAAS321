import request from '@/utils/request'
/**
 *获取员工列表
 * @param {*} params
 * @returns
 */
export const getRoleList = (params) => {
  return request({
    url: '/sys/role',
    params
  })
}
/**
 *新增角色
 * @param {*} data
 * @returns
 */
export const addRoleList = (data) => {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}

/**
 * 修改角色
 * ***/
export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    data,
    method: 'put'
  })
}
/**
 * 删除员工接口
 * ****/

export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}
/**
 * 获取公司信息
 * **/
export function getCompanyInfo(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}
