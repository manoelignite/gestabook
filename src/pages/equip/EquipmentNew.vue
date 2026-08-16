<template>
  <div class="list-page-container">
    <div class="page-header">
      <h2 class="page-title">Cadastrar Equipamento</h2>
      <p class="page-subtitle">Selecione uma categoria para cadastrar ou utilize o preenchimento rápido</p>
    </div>

    <div class="sections-list">
      <!-- Seção Notebooks -->
      <section class="m3-card m3-card--elevated equipment-section-card">
        <div class="m3-card__content">
          <div class="section-header">
            <div class="header-main">
              <div class="section-icon">
                <span class="material-symbols" style="--md-sym-opsz: 28">laptop_mac</span>
              </div>
              <div class="section-titles">
                <h3 class="section-title">Notebooks</h3>
                <p class="section-subtitle">Gestão e cadastro de notebooks e chromebooks</p>
              </div>
            </div>
          </div>

          <!-- Botão Principal -->
          <div class="main-action">
            <button class="m3-btn m3-btn--filled m3-btn--has-icon full-width" @click="goToNotebookNew()">
              <span class="material-symbols" style="--md-sym-opsz: 18">add_circle</span>
              <span>Cadastrar Novo Notebook</span>
            </button>
          </div>

          <!-- Atalhos Diretos / Pills -->
          <div class="presets-container">
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
.list-page-container {
  padding: 36px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  flex-grow: 1;
  width: 100%;
  box-sizing: border-box;
}

.page-header {
  text-align: center;
}

.page-title {
  margin: 0;
  font: var(--md-sys-typescale-headline-medium);
  color: var(--md-sys-color-on-surface);
}

.page-subtitle {
  margin: 4px 0 0 0;
  font: var(--md-sys-typescale-body-medium);
  color: var(--md-sys-color-on-surface-variant);
}

.sections-list {
  width: 100%;
  max-width: 840px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.equipment-section-card {
  width: 100%;
  text-align: left;
  box-sizing: border-box;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--md-sys-color-outline-variant);
  margin-bottom: 20px;
}

.header-main {
  display: flex;
  align-items: center;
  gap: 14px;
}

.section-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background-color: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
  border-radius: var(--md-sys-shape-medium);
}

.section-titles {
  display: flex;
  flex-direction: column;
}

.section-title {
  margin: 0;
  font: var(--md-sys-typescale-title-large);
  color: var(--md-sys-color-on-surface);
}

.section-subtitle {
  margin: 2px 0 0 0;
  font: var(--md-sys-typescale-body-small);
  color: var(--md-sys-color-on-surface-variant);
}

.main-action {
  margin-bottom: 20px;
}

.full-width {
  width: 100%;
}

.presets-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid var(--md-sys-color-outline-variant);
}

.presets-label {
  font: var(--md-sys-typescale-label-medium);
  color: var(--md-sys-color-on-surface-variant);
}

.pills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
