<script setup lang="ts">
import { useRouter } from 'vue-router'
import AdminNavButtons from './AdminNavButtons.vue'

const router = useRouter()
</script>

<template>
  <nav class="bottom-nav-bar">
    <div class="nav-scroll-container">
      <button class="m3-btn m3-btn--tonal m3-btn--has-icon nav-item-btn" @click="router.push('/dashboard')">
        <span class="material-symbols" style="--md-sym-opsz: 18">dashboard</span>
        <span>Dashboard</span>
      </button>
      <button class="m3-btn m3-btn--tonal m3-btn--has-icon nav-item-btn" @click="router.push('/equipment/list')">
        <span class="material-symbols" style="--md-sym-opsz: 18">devices</span>
        <span>Listar Equipamentos</span>
      </button>
      <button class="m3-btn m3-btn--tonal m3-btn--has-icon nav-item-btn" @click="router.push('/equipment/new')">
        <span class="material-symbols" style="--md-sym-opsz: 18">add_circle</span>
        <span>Cadastrar Equipamento</span>
      </button>
      <button class="m3-btn m3-btn--tonal m3-btn--has-icon nav-item-btn" @click="router.push('/reservations/my')">
        <span class="material-symbols" style="--md-sym-opsz: 18">book_online</span>
        <span>Minhas Reservas</span>
      </button>
      <AdminNavButtons />
    </div>
  </nav>
</template>

<style scoped>
.bottom-nav-bar {
  height: 64px;
  flex-shrink: 0;
  background-color: var(--md-sys-color-surface-container, #F3EDF7);
  border-top: 1px solid var(--md-sys-color-outline-variant);
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 12px;
  padding-bottom: max(0px, env(safe-area-inset-bottom, 0px));
  box-sizing: border-box;
  overflow: hidden;
}

.nav-scroll-container {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  padding: 4px 4px;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
  justify-content: flex-start;
}

.nav-scroll-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge */
}

@media (min-width: 960px) {
  .nav-scroll-container {
    justify-content: center;
  }
}

:deep(.nav-item-btn),
:deep(.m3-btn) {
  flex-shrink: 0 !important;
  height: 38px;
  padding: 0 14px;
  font-size: 13px;
  white-space: nowrap;
}

:deep(.material-symbols) {
  flex-shrink: 0;
}
</style>

