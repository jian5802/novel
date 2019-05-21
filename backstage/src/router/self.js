export default {
  path: 'self',
  component: () => import('../components/self/self'),
  children: [
    {
      path: 'modify',
      component: () => import('../components/self/self-modify')
    }
  ]
}
