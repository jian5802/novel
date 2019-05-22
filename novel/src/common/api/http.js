import Axios from 'axios'

const axios = Axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
})
// 指示是否跨站点访问控制请求
axios.defaults.withCredentials = true
// axios默认配置
axios.defaults.timeout = 10000 // 超时时间
// axios.defaults.baseURL = 'http://localhost:88'

// 路由请求拦截
axios.interceptors.request.use(config => {
  // 在发送请求之前做处理，比如设置token
  // config.headers['token'] = 'token's
  return config
}, error => {
  // 请求错误时的处理
  return Promise.reject(error)
})

// 路由响应拦截
axios.interceptors.response.use(response => {
  // 对响应数据的处理
  if (response.data.resultCode === '404') {
    console.log('response.data.resultCode是404')
    // window.location.href = 'http://login.com'
  }
  return response
}, error => {
  return Promise.reject(error.response) // 返回接口返回时的错误信息
})

export default axios
