import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import AdminIndex from '../pages/admin/index.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminIndex
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router
