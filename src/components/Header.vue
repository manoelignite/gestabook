<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <header>
    <button @click="router.back()">Voltar</button>
    <h1 align="center">Gestabook</h1>
  </header>
</template>
