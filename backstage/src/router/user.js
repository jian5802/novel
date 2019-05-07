export default {
  path: 'user',
  component: () => import('../components/user/user'),
  children: [
    {
      path: 'list',
      component: () => import('../components/user/user-list')
    }
  ]
}
