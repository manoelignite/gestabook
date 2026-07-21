import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import AdminIndex from '../pages/admin/index.vue'
import Dashborad from '../pages/Dashboard.vue'
import EquipmentForm from '../pages/EquipmentForm.vue'
import ListEquipments from '../pages/ListEquipments.vue'
import { useAuthStore } from '../stores/auth.ts'

const routes = [
  { path: '/', component: Login, meta: { requiresGuest: true } },
  { path: '/admin', component: AdminIndex, meta: { requiresAuth: true, allowedRoles: ['admin'] } },
  { path: '/dashboard', component: Dashborad, meta: { requiresAuth: true, allowedRoles: ['admin', 'user'] } },
  { path: '/equipment/new', component: EquipmentForm, meta: { requiresAuth: true, allowedRoles: ['admin', 'user'] } },
  { path: '/equipment/list', component: ListEquipments, meta: { requiresAuth: true, allowedRoles: ['admin', 'user'] } }
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
