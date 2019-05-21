export default {
  path: 'user',
  component: () => import('../components/user/user'),
  children: [
    {
      path: 'list',
      component: () => import('../components/user/user-list')
    },
    {
      path: 'modify',
      component: () => import('../components/user/user-modify')
    }
  ]
}
