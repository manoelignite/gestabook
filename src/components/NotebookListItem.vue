<script setup lang="ts">
import FilterPill from './FilterPill.vue'

export interface NotebookItem {
  id?: string
  brand?: string
  model?: string
  serialNumber?: string
  cart?: string
  number?: number
  condition?: string
  maintenance?: boolean
  type?: string
}

const props = withDefaults(defineProps<{
  notebook: NotebookItem
  selectedCart?: string | null
  showAllPills?: boolean
}>(), {
  selectedCart: null,
  showAllPills: true
})

const emit = defineEmits<{
  (e: 'click', notebook: NotebookItem): void
  (e: 'cart-click', cart: string): void
}>()

const getBrandModelText = () => {
  const brand = props.notebook.brand || ''
  const model = props.notebook.model || ''
  if (brand && model) return `${brand} ${model}`
  if (brand) return brand
  if (model) return model
  return 'Notebook Sem Nome'
}

const getConditionVariant = (condition?: string) => {
  switch (condition?.toLowerCase()) {
    case 'excelente': return 'green'
    case 'boa': return 'blue'
    case 'ruim': return 'orange'
    default: return 'default'
  }
}

const getConditionIcon = (condition?: string) => {
  switch (condition?.toLowerCase()) {
    case 'excelente': return 'sentiment_very_satisfied'
    case 'boa': return 'thumb_up'
    case 'ruim': return 'warning'
    default: return 'help'
  }
}

const capitalize = (text?: string) => {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1)
}

const handleCartClick = (event: MouseEvent) => {
  event.stopPropagation()
  if (props.notebook.cart) {
    emit('cart-click', props.notebook.cart)
  }
}
</script>

<template>
  <div 
    class="m3-list-item notebook-list-item"
    tabindex="0"
    @click="emit('click', notebook)"
  >
    <div class="item-icon">
      <span class="material-symbols" style="--md-sym-opsz: 22">laptop_mac</span>
    </div>

    <div class="item-details">
      <div class="item-title">{{ getBrandModelText() }}</div>
      <div class="item-subdetails">
        <span class="item-sn">SN: {{ notebook.serialNumber || 'N/A' }}</span>
        <span class="separator" v-if="notebook.number">•</span>
        <span class="item-number" v-if="notebook.number">Nº {{ notebook.number }}</span>
      </div>
    </div>

    <div class="item-pills">
      <!-- Pill de Carrinho -->
      <FilterPill 
        v-if="notebook.cart" 
        :key="`cart-${notebook.id || notebook.serialNumber}`"
        :label="notebook.cart"
        icon="charger"
        :active="selectedCart === notebook.cart"
        title="Filtrar por este carrinho"
        @click="handleCartClick"
      />

      <!-- Pill de Condição -->
      <FilterPill 
        v-if="showAllPills"
        :key="`condition-${notebook.id || notebook.serialNumber}`"
        :label="notebook.condition ? capitalize(notebook.condition) : 'N/A'"
        :icon="getConditionIcon(notebook.condition)"
        :variant="getConditionVariant(notebook.condition)"
      />

      <!-- Pill de Manutenção -->
      <FilterPill 
        v-if="showAllPills"
        :key="`maint-${notebook.id || notebook.serialNumber}`"
        :label="notebook.maintenance ? 'Em Manutenção' : 'Operacional'"
        :icon="notebook.maintenance ? 'build' : 'check_circle'"
        :variant="notebook.maintenance ? 'red' : 'green'"
      />
    </div>
  </div>
</template>

<style scoped>
.notebook-list-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 18px;
  background-color: var(--md-sys-color-surface-container-low);
  border-radius: var(--md-sys-shape-medium);
  border: 1px solid var(--md-sys-color-outline-variant);
  cursor: pointer;
  transition: background-color 150ms ease, box-shadow 150ms ease;
  text-align: left;
  box-sizing: border-box;
}

.notebook-list-item:hover {
  background-color: var(--md-sys-color-surface-container-high);
  box-shadow: var(--md-sys-elevation-1);
}

.item-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
  width: 40px;
  height: 40px;
  border-radius: var(--md-sys-shape-full);
  flex-shrink: 0;
}

.item-details {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
}

.item-title {
  font: var(--md-sys-typescale-title-medium);
  color: var(--md-sys-color-on-surface);
}

.item-subdetails {
  display: flex;
  align-items: center;
  gap: 6px;
  font: var(--md-sys-typescale-body-small);
  color: var(--md-sys-color-on-surface-variant);
}

.separator {
  color: var(--md-sys-color-outline-variant);
}

.item-pills {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  flex-shrink: 0;
}
</style>
