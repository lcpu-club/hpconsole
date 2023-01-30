// Composables
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/instance-types',
    component: () => import('@/views/InstanceTypeView.vue')
  },
  {
    path: '/task/new',
    component: () => import('@/views/TaskNew.vue')
  },
  {
    path: '/task/view/:taskName',
    component: () => import('@/views/TaskView.vue'),
    props: (route) =>
      Object.assign({ key: route.params.taskName }, route.params)
  },
  {
    path: '/terminal',
    component: () => import('@/views/TerminalView.vue'),
    props: (route) => route.query
  }
] satisfies RouteRecordRaw[]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
