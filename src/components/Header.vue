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
    <div class="header-left">
      <button class="m3-btn m3-btn--tonal m3-btn--has-icon wco-no-drag" @click="router.back()">
        <span class="material-symbols" style="--md-sym-opsz: 18">arrow_back</span>
        <span>Voltar</span>
      </button>
    </div>
    <h1 class="header-title">Gestabook_</h1>
  </header>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@700&display=swap');

.app-header {
  -webkit-app-region: drag;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  height: 64px;
  padding: 0 16px;
  width: 100%;
  box-sizing: border-box;
  background-color: var(--md-sys-color-surface-container, #F3EDF7);
  border-bottom: 1px solid var(--md-sys-color-outline-variant);
  box-shadow: none;
}

.header-left {
  display: flex;
  align-items: center;
  z-index: 2;
}

.header-title {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  font-family: 'Outfit', sans-serif;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.5px;
  color: var(--md-sys-color-on-surface);
  white-space: nowrap;
  pointer-events: none;
  z-index: 1;
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
    border-bottom: 1px solid var(--md-sys-color-outline-variant);
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
  border-bottom: 1px solid var(--md-sys-color-outline-variant);
  box-shadow: none;
  z-index: 10000;
}

.wco-no-drag {
  -webkit-app-region: no-drag;
}

.app-header .m3-btn {
  height: 34px;
  padding: 0 12px;
  font-size: 13px;
}
</style>


