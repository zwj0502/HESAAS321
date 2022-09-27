import request from '@/utils/request'

export const getRoleList = (params) => {
  return request({
    url: '/sys/role',
    params
  })
}

export const addRoleList = (data) => {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}
