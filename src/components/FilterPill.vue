<script setup lang="ts">
export type PillVariant = 'default' | 'success' | 'info' | 'warning' | 'error' | 'green' | 'blue' | 'orange' | 'red';

defineProps<{
  label: string
  icon?: string
  active?: boolean
  disabled?: boolean
  variant?: PillVariant
}>()

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>

<template>
  <button 
    type="button" 
    class="pill-btn" 
    :class="[
      { active: active },
      variant ? `variant-${variant}` : ''
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <span v-if="icon" class="material-symbols" style="--md-sym-opsz: 16">{{ icon }}</span>
    <span>{{ label }}</span>
  </button>
</template>

<style scoped>
.pill-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  height: 32px;
  border-radius: var(--md-sys-shape-full);
  border: 1px solid var(--md-sys-color-outline-variant);
  background-color: var(--md-sys-color-surface-container);
  color: var(--md-sys-color-on-surface-variant);
  font: var(--md-sys-typescale-label-medium);
  cursor: pointer;
  transition: all 150ms cubic-bezier(0.2, 0, 0, 1);
  user-select: none;
  box-sizing: border-box;
}

.pill-btn:hover:not(:disabled) {
  background-color: var(--md-sys-color-surface-container-high);
  color: var(--md-sys-color-on-surface);
  transform: translateY(-1px);
}

.pill-btn.active {
  background-color: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
  border-color: var(--md-sys-color-primary);
  font-weight: 600;
  box-shadow: var(--md-sys-elevation-1);
}

/* VARIANTES DE COR PARA CONDIÇÃO E MANUTENÇÃO */
.pill-btn.variant-success,
.pill-btn.variant-green {
  background-color: #E8F5E9;
  color: #2E7D32;
  border-color: #C8E6C9;
}

.pill-btn.variant-info,
.pill-btn.variant-blue {
  background-color: #E3F2FD;
  color: #1565C0;
  border-color: #BBDEFB;
}

.pill-btn.variant-warning,
.pill-btn.variant-orange {
  background-color: #FFF3E0;
  color: #E65100;
  border-color: #FFE0B2;
}

.pill-btn.variant-error,
.pill-btn.variant-red {
  background-color: #FFEBEE;
  color: #C62828;
  border-color: #FFCDD2;
}

.pill-btn:disabled {
  opacity: 0.7;
  cursor: default;
}
</style>
