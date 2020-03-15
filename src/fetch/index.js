import axios from 'axios'

export const baseURL = process.env.NODE_ENV === 'development' ? '' : ''
const protocol = window.location.protocol // 协议
const host = window.location.host // 主机
const reg = /^localhost+/
if (reg.test(host)) {
  // 若本地项目调试使用
  axios.defaults.baseURL = baseURL // 配置默认域名，请求接口时自动添加域名
} else {
  // 动态请求地址             协议               主机
  axios.defaults.baseURL = protocol + '//' + host
}
// axios.defaults.baseURL = baseURL // 配置默认域名，请求接口时自动添加域名

axios.defaults.timeout = 20000 // 响应时间
axios.defaults.headers = {
  'Content-Type': 'application/json;charset=UTF-8'
}

axios.defaults.withCredentials = true // 是否是跨域请求

axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// 请求响应数据返回后的拦截器
axios.interceptors.response.use(
  rsp => {
    return rsp
  },
  err => {
    console.log('axios响应拦截器---请求失败')
    if (err.response) {
      console.log('baocuo')
    }
  }
)

export default axios
