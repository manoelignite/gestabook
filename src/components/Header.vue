<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <header>
    <button class="m3-btn m3-btn--tonal m3-btn--has-icon" @click="router.back()">
      <span class="material-symbols" style="--md-sym-opsz: 18">arrow_back</span>
      <span>Voltar</span>
    </button>
    <h1 align="center">Gestabook</h1>
  </header>
</template>
