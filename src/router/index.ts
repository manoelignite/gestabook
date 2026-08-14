import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import AdminIndex from '../pages/admin/index.vue'
import Dashborad from '../pages/Dashboard.vue'
import EquipmentNew from '../pages/equip/EquipmentNew.vue'
import NotebookNew from '../pages/equip/NotebookNew.vue'
import NotebookList from '../pages/equip/NotebookList.vue'
import ListEquipments from '../pages/ListEquipments.vue'
import MyReservations from '../pages/MyReservations.vue'
import AdminReservations from '../pages/admin/Reservations.vue'
import { useAuthStore } from '../stores/auth.ts'

const routes = [
  { path: '/', component: Login, meta: { requiresGuest: true } },
  { path: '/admin', component: AdminIndex, meta: { requiresAuth: true, allowedRoles: ['admin'] } },
  { path: '/dashboard', component: Dashborad, meta: { requiresAuth: true, allowedRoles: ['admin', 'user'] } },
  { path: '/equipment/new', component: EquipmentNew, meta: { requiresAuth: true, allowedRoles: ['admin', 'user'] } },
  { path: '/notebook/new', component: NotebookNew, meta: { requiresAuth: true, allowedRoles: ['admin', 'user'] } },
  { path: '/notebook/list', component: NotebookList, meta: { requiresAuth: true, allowedRoles: ['admin', 'user'] } },
  { path: '/equipment/list', component: ListEquipments, meta: { requiresAuth: true, allowedRoles: ['admin', 'user'] } },
  { path: '/reservations/my', component: MyReservations, meta: { requiresAuth: true, allowedRoles: ['admin', 'user'] } },
  { path: '/admin/reservations', component: AdminReservations, meta: { requiresAuth: true, allowedRoles: ['admin'] } }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore();

  if (authStore.isLoading) {
    await authStore.initAuth();
  }

  const isAuthenticated = !!authStore.user;
  const userRole = authStore.role;

  if (to.meta.requiresAuth) {
    if (!isAuthenticated || userRole === 'denied') {
      return '/'
    }

    const allowedRoles = to.meta.allowedRoles as string[] | undefined;
    if (allowedRoles && !allowedRoles.includes(userRole as string)) {
      return '/dashboard'
    }
  }

  if (to.meta.requiresGuest && isAuthenticated && userRole !== 'denied') {
    const targetPath = userRole === 'admin' ? '/admin' : '/dashboard';

    if (to.path !== targetPath) {
      return targetPath
    }
  }

  return true;
});


export default router
