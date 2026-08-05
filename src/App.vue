<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
import Bottombar from './components/Bottombar.vue';
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore();
</script>

<template>
  <div class="app-layout">
    <Header v-if="authStore.user && authStore.role !== 'denied'" />
    <RouterView />
    <Bottombar v-if="authStore.user && authStore.role !== 'denied'" />
  </div>
</template>

<style scoped>
.app-layout {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
