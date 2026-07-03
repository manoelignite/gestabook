import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import AdminIndex from '../pages/admin/index.vue'
import Dashborad from '../pages/Dashborad.vue'

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
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashborad
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router
