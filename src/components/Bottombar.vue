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
    <button class="m3-btn m3-btn--tonal m3-btn--has-icon" @click="router.push('/dashboard')">
      <span class="material-symbols" style="--md-sym-opsz: 18">dashboard</span>
      <span>Dashboard</span>
    </button>
    <button class="m3-btn m3-btn--tonal m3-btn--has-icon" @click="router.push('/equipment/list')">
      <span class="material-symbols" style="--md-sym-opsz: 18">devices</span>
      <span>Listar Equipamentos</span>
    </button>
    <button class="m3-btn m3-btn--tonal m3-btn--has-icon" @click="router.push('/equipment/new')">
      <span class="material-symbols" style="--md-sym-opsz: 18">add_circle</span>
      <span>Cadastrar Equipamento</span>
    </button>
    <button class="m3-btn m3-btn--tonal m3-btn--has-icon" @click="router.push('/reservations/my')">
      <span class="material-symbols" style="--md-sym-opsz: 18">book_online</span>
      <span>Minhas Reservas</span>
    </button>
    <AdminNavButtons />
    <button class="m3-btn m3-btn--tonal m3-btn--has-icon" @click="handleLogout" style="background-color: var(--md-sys-color-error-container); color: var(--md-sys-color-on-error-container);">
      <span class="material-symbols" style="--md-sym-opsz: 18">logout</span>
      <span>Sair</span>
    </button>
  </nav>
</template>
