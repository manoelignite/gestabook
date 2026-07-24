<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const isDisabled = computed(() => authStore.role !== 'admin')
</script>

<template>
  <button :disabled="isDisabled" @click="router.push('/admin')">
    Gerenciar Whitelist
  </button>
  <button :disabled="isDisabled" @click="router.push('/admin/reservations')">
    Gerenciar Reservas
  </button>
</template>
