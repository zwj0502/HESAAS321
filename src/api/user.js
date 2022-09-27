import request from '@/utils/request'

export const getUserinfo = (data) => {
  return request({
    url: '/sys/profile',
    method: 'POST',
    data
  })
}

export const getUserDetailById = (id) => {
  return request({
    url: `/sys/user/${id}`
  })
}
