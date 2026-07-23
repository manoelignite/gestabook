<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore();
</script>

<template>
  <div>
    <Header v-if="authStore.user && authStore.role !== 'denied'" />
    <RouterView />
  </div>
</template>
