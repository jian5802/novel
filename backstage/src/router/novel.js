export default {
  path: 'novel',
  component: () => import('../components/novel/novel'),
  children: [
    {
      path: 'list',
      component: () => import('../components/novel/novel-list')
    },
    {
      path: 'modify',
      component: () => import('../components/novel/novel-modify')
    },
    {
      path: 'add',
      component: () => import('../components/novel/novel-add')
    },
    {
      path: 'catalog',
      component: () => import('../components/novel/novel-catalog')
    }
  ]
}
