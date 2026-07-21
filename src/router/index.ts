import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import AdminIndex from '../pages/admin/index.vue'
import Dashborad from '../pages/Dashboard.vue'
import EquipmentForm from '../pages/EquipmentForm.vue'
import ListEquipments from '../pages/ListEquipments.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/admin', component: AdminIndex },
  { path: '/dashboard', component: Dashborad },
  { path: '/equipment/new', component: EquipmentForm },
  { path: '/equipment/list', component: ListEquipments }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router
