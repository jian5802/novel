import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import admin from '@/components/admin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/admin/login'
    },
    {
      path: '/admin/login',
      component: login
    },
    {
      path: '/admin',
      component: admin,
      children: [
        require('./user').default,
        require('./novel').default,
        require('./self').default
      ]
    }
  ]
})
