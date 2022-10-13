import request from '@/utils/request'

export const getUserinfo = (data) => {
  return request({
    url: '/sys/profile',
    method: 'POST',
    data
  })
}
/**
 *添加员工
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
