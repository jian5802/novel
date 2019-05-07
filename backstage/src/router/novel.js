export default {
  path: 'novel',
  component: () => import('../components/novel/novel'),
  children: [
    {
      path: 'list',
      component: () => import('../components/novel/novel-list')
    },
    {
      path: 'add',
      component: () => import('../components/novel/novel-add')
    }
  ]
}
