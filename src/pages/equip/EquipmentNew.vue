<template>
  <div class="form-page-container">
    <div class="sections-container">
      <!-- Seção Notebooks -->
      <section class="m3-card m3-card--elevated equipment-section">
        <div class="m3-card__content">
          <div class="section-header">
            <span class="material-symbols icon-primary" style="--md-sym-opsz: 32">laptop_mac</span>
            <div>
              <h2 class="section-title">Notebooks</h2>
              <p class="section-subtitle">Gestão e cadastro de notebooks e chromebooks</p>
            </div>
          </div>

          <!-- Botão Principal -->
          <div class="main-action">
            <button class="m3-btn m3-btn--filled m3-btn--has-icon full-width" @click="goToNotebookNew()">
              <span class="material-symbols" style="--md-sym-opsz: 18">add_circle</span>
              <span>Cadastrar Notebook</span>
            </button>
          </div>

          <!-- Atalhos Diretos / Pills -->
          <div class="presets-container">
            <span class="presets-label">Comandos Diretos / Preenchimento Rápido:</span>
            <div class="pills-grid">
              <button 
                v-for="preset in notebookPresets" 
                :key="preset.label"
                class="pill-btn" 
                @click="goToNotebookNew(preset.brand, preset.model)"
              >
                <span class="material-symbols" style="--md-sym-opsz: 18">{{ preset.icon || 'laptop_mac' }}</span>
                <span>{{ preset.label }}</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

interface Preset {
  label: string
  brand: string
  model: string
  icon?: string
}

const notebookPresets: Preset[] = [
  { label: 'Samsung Chromebook', brand: 'Samsung', model: 'Chromebook 4' },
  { label: 'Dell Latitude', brand: 'Dell', model: 'Latitude 5430' },
  { label: 'Lenovo Chromebook', brand: 'Lenovo', model: '300e' },
  { label: 'Positivo Chromebook', brand: 'Positivo', model: 'CH1140' }
]

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
.form-page-container {
  padding: 48px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  flex-grow: 1;
}

.form-title {
  font: var(--md-sys-typescale-headline-medium);
  color: var(--md-sys-color-on-surface);
  text-align: center;
}

.sections-container {
  width: 100%;
  max-width: 680px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.equipment-section {
  width: 100%;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.icon-primary {
  color: var(--md-sys-color-primary);
}

.section-title {
  font: var(--md-sys-typescale-title-large);
  color: var(--md-sys-color-on-surface);
}

.section-subtitle {
  font: var(--md-sys-typescale-body-medium);
  color: var(--md-sys-color-on-surface-variant);
}

.main-action {
  margin-bottom: 24px;
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

/* Estilo Pill / Chip com cor de acento mais clara (M3 Container Role) */
.pill-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  height: 36px;
  border-radius: var(--md-sys-shape-full);
  border: 1px solid var(--md-sys-color-outline-variant);
  background-color: var(--md-sys-color-secondary-container);
  color: var(--md-sys-color-on-secondary-container);
  font: var(--md-sys-typescale-label-large);
  cursor: pointer;
  transition: background-color 200ms cubic-bezier(0.2, 0, 0, 1),
              box-shadow 200ms cubic-bezier(0.2, 0, 0, 1),
              transform 100ms ease;
}

.pill-btn:hover {
  background-color: var(--md-sys-color-tertiary-container);
  color: var(--md-sys-color-on-tertiary-container);
  box-shadow: var(--md-sys-elevation-1);
  transform: translateY(-1px);
}

.pill-btn:active {
  transform: translateY(0);
}
</style>
