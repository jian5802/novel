// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './common/api/http'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/base.scss'
import qs from 'qs'

// 设置请求数据格式(转换成字符串型formData)
axios.defaults.transformRequest = data => {
  return qs.stringify(data)
}

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$axios = axios
Vue.prototype.$sessionStorage = window.sessionStorage
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
