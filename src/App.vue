<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
import Bottombar from './components/Bottombar.vue';
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore();
</script>

<template>
  <div>
    <Header v-if="authStore.user && authStore.role !== 'denied'" />
    <RouterView />
    <Bottombar v-if="authStore.user && authStore.role !== 'denied'" />
  </div>
</template>
