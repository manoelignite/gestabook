<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const isDisabled = computed(() => authStore.role !== 'admin')
</script>

<template>
  <button class="m3-btn m3-btn--tonal m3-btn--has-icon" :disabled="isDisabled" @click="router.push('/admin')">
    <span class="material-symbols" style="--md-sym-opsz: 18">admin_panel_settings</span>
    <span>Gerenciar Whitelist</span>
  </button>
  <button class="m3-btn m3-btn--tonal m3-btn--has-icon" :disabled="isDisabled" @click="router.push('/admin/reservations')">
    <span class="material-symbols" style="--md-sym-opsz: 18">event_note</span>
    <span>Gerenciar Reservas</span>
  </button>
</template>
