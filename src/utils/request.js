// 实现对\docs\rules\spaced-commentaxios
import axios from 'axios'
import { Message } from 'element-ui'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
service.interceptors.response.use(response => { 
  const { message, data, success } = response.data
  if (success) { 
return data
  }
  Message.error(message)
  return Promise.reject(new Error(message))
}, error => { 
  Message.error(error.message)
  return Promise.reject(error)
})
export default service
