import request from '@/utils/request'

export const getUserinfo = (data) => {
  return request({
    url: '/sys/profile',
    method: 'POST',
    data
  })
}
/**
 *
 * @param {*} id
 * @returns
 */
export const getUserDetailById = (id) => {
  return request({
    url: `/sys/user/${id}`
  })
}

/**
 *保存修改员工
 * @param {} data
 * @returns
 */
export const updateUserDetailById = (data) => {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}

/**
 *给员工分配角色
 * @param {} data
 * @returns
 */
export const setemployeesRoles = (data) => {
  return request({
    url: '/sys/user/assignRoles',
    method: 'put',
    data
  })
}

