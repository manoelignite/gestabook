<template>
  <div class="m3-page-layout">
    <div class="m3-page-header">
      <h2 class="m3-page-header__title">Cadastrar Equipamento</h2>
      <p class="m3-page-header__subtitle">Selecione uma categoria para cadastrar ou utilize o preenchimento rápido</p>
    </div>

    <div class="m3-page-content">
      <!-- Seção Notebooks -->
      <section class="m3-surface-card">
        <div class="category-header">
          <div class="category-icon">
            <span class="material-symbols" style="--md-sym-opsz: 28">laptop_mac</span>
          </div>
          <div class="category-titles">
            <h3 class="category-title">Notebooks</h3>
            <p class="category-subtitle">Gestão e cadastro de notebooks e chromebooks</p>
          </div>
        </div>

        <div class="main-action">
          <button class="m3-btn m3-btn--filled m3-btn--has-icon full-width" @click="goToNotebookNew()">
            <span class="material-symbols" style="--md-sym-opsz: 18">add_circle</span>
            <span>Cadastrar Novo Notebook</span>
          </button>
        </div>

        <div class="presets-block">
          <span class="presets-label">Comandos Diretos / Preenchimento Rápido:</span>
          <div class="pills-grid">
            <FilterPill 
              v-for="preset in notebookPresets" 
              :key="preset.label"
              :label="preset.label"
              :icon="preset.icon || 'laptop_mac'"
              @click="goToNotebookNew(preset.brand, preset.model)"
            />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { FilterPill } from '../../components/pills'
import { MODEL_PRESETS } from '../../types/notebook'

const router = useRouter()

const notebookPresets = MODEL_PRESETS

const goToNotebookNew = (brand?: string, model?: string) => {
  if (brand && model) {
    router.push({
      path: '/notebook/new',
      query: { brand, model }
    })
  } else {
    router.push('/notebook/new')
  }
}
</script>

<style scoped>
.category-header {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--md-sys-color-outline-variant);
}

.category-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background-color: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
  border-radius: var(--md-sys-shape-medium);
  flex-shrink: 0;
}

.category-titles {
  display: flex;
  flex-direction: column;
}

.category-title {
  margin: 0;
  font: var(--md-sys-typescale-title-large);
  color: var(--md-sys-color-on-surface);
}

.category-subtitle {
  margin: 2px 0 0 0;
  font: var(--md-sys-typescale-body-small);
  color: var(--md-sys-color-on-surface-variant);
}

.main-action {
  width: 100%;
}

.full-width {
  width: 100%;
}

.presets-block {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 12px;
  border-top: 1px solid var(--md-sys-color-outline-variant);
}

.presets-label {
  font: var(--md-sys-typescale-label-medium);
  color: var(--md-sys-color-on-surface-variant);
  text-align: left;
}

.pills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
