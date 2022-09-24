// 实现对\docs\rules\spaced-commentaxios
import axios from 'axios'
const service = axios.create({
  baseURL: '/dev',
  timeout: 5000
})
export default service
