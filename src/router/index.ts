import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import AdminIndex from '../pages/admin/index.vue'
import Dashborad from '../pages/Dashboard.vue'
import EquipmentForm from '../pages/EquipmentForm.vue'
import ListEquipments from '../pages/ListEquipments.vue'

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
  },
  {
    path: '/equipment/new',
    name: 'New Equipment',
    component: EquipmentForm
  },
  {
    path: '/equipment/list',
    name: 'List Equipments',
    component: ListEquipments
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router
