<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isWcoVisible = ref(false)

const onGeometryChange = (event: any) => {
  isWcoVisible.value = event.visible
}

onMounted(() => {
  if ('windowControlsOverlay' in navigator) {
    const wco = (navigator as any).windowControlsOverlay
    isWcoVisible.value = wco.visible
    wco.addEventListener('geometrychange', onGeometryChange)
  }
})

onUnmounted(() => {
  if ('windowControlsOverlay' in navigator) {
    const wco = (navigator as any).windowControlsOverlay
    wco.removeEventListener('geometrychange', onGeometryChange)
  }
})
</script>

<template>
  <header class="app-header" :class="{ 'is-wco-active': isWcoVisible }">
    <button class="m3-btn m3-btn--tonal m3-btn--has-icon wco-no-drag" @click="router.back()">
      <span class="material-symbols" style="--md-sym-opsz: 18">arrow_back</span>
      <span>Voltar</span>
    </button>
    <h1 align="center">Gestabook</h1>
  </header>
</template>

<style scoped>
.app-header {
  -webkit-app-region: drag;
  user-select: none;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  box-sizing: border-box;
  background-color: var(--md-sys-color-surface-container, #F3EDF7);
}

@media (display-mode: window-controls-overlay) {
  .app-header {
    position: fixed;
    top: env(titlebar-area-y, 0px);
    left: 0;
    width: 100%;
    height: max(env(titlebar-area-height, 48px), 48px);
    padding-left: calc(env(titlebar-area-x, 0px) + 12px);
    padding-right: calc(100% - env(titlebar-area-x, 0px) - env(titlebar-area-width, 100%) + 12px);
    border-bottom: none;
    box-shadow: none;
    z-index: 10000;
  }
}

.app-header.is-wco-active {
  position: fixed;
  top: env(titlebar-area-y, 0px);
  left: 0;
  width: 100%;
  height: max(env(titlebar-area-height, 48px), 48px);
  padding-left: calc(env(titlebar-area-x, 0px) + 12px);
  padding-right: calc(100% - env(titlebar-area-x, 0px) - env(titlebar-area-width, 100%) + 12px);
  border-bottom: none;
  box-shadow: none;
  z-index: 10000;
}

.wco-no-drag {
  -webkit-app-region: no-drag;
}

/* Ajuste proporcional para o botão dentro do cabeçalho no modo WCO */
.app-header .m3-btn {
  height: 32px;
  padding: 0 12px;
  font-size: 13px;
}

</style>


