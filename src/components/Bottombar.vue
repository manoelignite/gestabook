<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import AdminNavButtons from './AdminNavButtons.vue'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = async () => {
  await authStore.logout()
  router.push('/')
}
</script>

<template>
  <nav>
    <button @click="router.push('/dashboard')">Dashboard</button>
    <button @click="router.push('/equipment/list')">Listar Equipamentos</button>
    <button @click="router.push('/equipment/new')">Cadastrar Equipamento</button>
    <button @click="router.push('/reservations/my')">Minhas Reservas</button>
    <AdminNavButtons />
    <button @click="handleLogout">Sair</button>
  </nav>
</template>
