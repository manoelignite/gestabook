<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
import BottomNavigationBar from './components/BottomNavigationBar.vue';
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore();
</script>

<template>
  <div class="app-layout">
    <Header v-if="authStore.user && authStore.role !== 'denied'" />
    <main class="app-content">
      <RouterView />
    </main>
    <BottomNavigationBar v-if="authStore.user && authStore.role !== 'denied'" />
  </div>
</template>

<style scoped>
.app-layout {
  width: 100%;
  height: 100vh;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
}

.app-content {
  flex: 1;
  overflow-y: auto;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
</style>
