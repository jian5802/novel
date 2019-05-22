import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import user from '@/components/user'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/user/login'
    },
    {
      path: '/user/login',
      component: login
    },
    {
      path: '/user',
      component: user,
      children: [
        require('./first').default,
        require('./kind').default,
        require('./novel').default,
        require('./catalog').default
      ]
    }
  ]
})
