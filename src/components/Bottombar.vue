<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

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
    <button :disabled="authStore.role !== 'admin'" @click="router.push('/admin')">
      Gerenciar Whitelist
    </button>
    <button :disabled="authStore.role !== 'admin'" @click="router.push('/admin/reservations')">
      Gerenciar Reservas
    </button>
    <button @click="handleLogout">Sair</button>
  </nav>
</template>
