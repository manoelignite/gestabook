<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { CartPill, ConditionPill, MaintenancePill } from './pills'
import { 
  DEFAULT_CART_OPTIONS, 
  CONDITION_OPTIONS, 
  type Notebook, 
  type NotebookCondition 
} from '../types/notebook'

const props = withDefaults(defineProps<{
  notebook?: Notebook | null
  mode?: 'create' | 'edit'
  isSaving?: boolean
  errorMessage?: string | null
  showCancel?: boolean
  submitLabel?: string
}>(), {
  notebook: null,
  mode: 'edit',
  isSaving: false,
  errorMessage: null,
  showCancel: undefined,
  submitLabel: undefined
})

const emit = defineEmits<{
  (e: 'save', formData: Omit<Notebook, 'id'>): void
  (e: 'cancel'): void
}>()

const formState = ref({
  brand: '',
  model: '',
  serialNumber: '',
  cart: 'Carrinho 1',
  number: null as number | null,
  condition: 'excelente' as NotebookCondition | string,
  maintenance: false
})

const availableCartOptions = computed(() => {
  const options = [...DEFAULT_CART_OPTIONS]
  const currentCart = formState.value.cart?.trim()
  if (currentCart && !options.some(opt => opt.trim().toLowerCase() === currentCart.toLowerCase())) {
    options.push(currentCart)
  }
  return options
})

const isCartActive = (option: string) => {
  if (!formState.value.cart) return false
  return formState.value.cart.trim().toLowerCase() === option.trim().toLowerCase()
}

const conditionOptions = CONDITION_OPTIONS

const isConditionActive = (condValue: string) => {
  if (!formState.value.condition) return false
  return formState.value.condition.trim().toLowerCase() === condValue.trim().toLowerCase()
}

const initForm = () => {
  if (props.notebook) {
    formState.value = {
      brand: props.notebook.brand !== undefined && props.notebook.brand !== null ? String(props.notebook.brand) : '',
      model: props.notebook.model !== undefined && props.notebook.model !== null ? String(props.notebook.model) : '',
      serialNumber: props.notebook.serialNumber !== undefined && props.notebook.serialNumber !== null ? String(props.notebook.serialNumber) : '',
      cart: props.notebook.cart !== undefined && props.notebook.cart !== null ? String(props.notebook.cart) : 'Carrinho 1',
      number: props.notebook.number ?? null,
      condition: props.notebook.condition ? String(props.notebook.condition).toLowerCase() : 'excelente',
      maintenance: !!props.notebook.maintenance
    }
  } else {
    formState.value = {
      brand: '',
      model: '',
      serialNumber: '',
      cart: 'Carrinho 1',
      number: null,
      condition: 'excelente',
      maintenance: false
    }
  }
}

watch(() => props.notebook, () => {
  initForm()
}, { immediate: true, deep: true })

const computedSubmitLabel = computed(() => {
  if (props.submitLabel) return props.submitLabel
  if (props.isSaving) {
    return props.mode === 'create' ? 'Cadastrando...' : 'Salvando...'
  }
  return props.mode === 'create' ? 'Cadastrar Notebook' : 'Salvar Alterações'
})

const computedSubmitIcon = computed(() => {
  if (props.isSaving) return 'sync'
  return props.mode === 'create' ? 'add_circle' : 'save'
})

const computedShowCancel = computed(() => {
  if (props.showCancel !== undefined) return props.showCancel
  return props.mode === 'edit'
})

const handleSubmit = () => {
  emit('save', {
    brand: String(formState.value.brand || '').trim(),
    model: String(formState.value.model || '').trim(),
    serialNumber: String(formState.value.serialNumber || '').trim(),
    cart: String(formState.value.cart || '').trim(),
    number: formState.value.number !== null && formState.value.number !== undefined && formState.value.number !== ('' as any) ? Number(formState.value.number) : undefined,
    condition: formState.value.condition,
    maintenance: formState.value.maintenance
  })
}
</script>

<template>
  <div class="notebook-form-container">
    <div v-if="errorMessage" class="error-banner">
      <span class="material-symbols" style="--md-sym-opsz: 18">error</span>
      <span>{{ errorMessage }}</span>
    </div>

    <form @submit.prevent="handleSubmit" class="notebook-form">
      <!-- SEÇÃO 1: DADOS DO EQUIPAMENTO -->
      <div class="form-section">
        <div class="section-header">
          <span class="material-symbols section-icon">info</span>
          <h3 class="section-title">Dados do Equipamento</h3>
        </div>

        <div class="form-grid">
          <div class="form-group">
            <label for="notebookBrand">Marca</label>
            <input 
              id="notebookBrand" 
              v-model="formState.brand" 
              type="text" 
              class="m3-input"
              placeholder="Ex: Dell, Lenovo, HP"
              required
            />
          </div>

          <div class="form-group">
            <label for="notebookModel">Modelo</label>
            <input 
              id="notebookModel" 
              v-model="formState.model" 
              type="text" 
              class="m3-input"
              placeholder="Ex: Latitude 5430"
              required
            />
          </div>

          <div class="form-group">
            <label for="notebookSN">Número de Série (SN)</label>
            <input 
              id="notebookSN" 
              v-model="formState.serialNumber" 
              type="text" 
              class="m3-input monospace"
              placeholder="Ex: BR12345XX"
              required
            />
          </div>

          <div class="form-group">
            <label for="notebookNumber">Número do Equipamento</label>
            <input 
              id="notebookNumber" 
              v-model.number="formState.number" 
              type="number" 
              class="m3-input"
              placeholder="Ex: 12"
            />
          </div>
        </div>
      </div>

      <div class="section-divider"></div>

      <!-- SEÇÃO 2: ALOCAÇÃO & ESTADO -->
      <div class="form-section">
        <div class="section-header">
          <span class="material-symbols section-icon">tune</span>
          <h3 class="section-title">Alocação & Estado</h3>
        </div>

        <div class="full-width-stack">
          <!-- Campo de Carrinho -->
          <div class="form-group full-width">
            <label>Identificação do Carrinho</label>
            <div class="cart-selector-pills" role="radiogroup" aria-label="Seleção do Carrinho">
              <CartPill 
                v-for="cartOption in availableCartOptions" 
                :key="cartOption" 
                :cart="cartOption"
                :active="isCartActive(cartOption)"
                @click="formState.cart = cartOption"
              />
            </div>
            <input 
              v-model="formState.cart" 
              type="text" 
              class="m3-input cart-custom-input"
              placeholder="Ou digite o nome do carrinho..."
              required
            />
          </div>

          <!-- Campo de Condição -->
          <div class="form-group full-width">
            <label>Condição do Notebook</label>
            <div class="condition-selector-pills" role="radiogroup" aria-label="Seleção da Condição">
              <ConditionPill 
                v-for="cond in conditionOptions" 
                :key="cond.value" 
                :condition="cond.value"
                :active="isConditionActive(cond.value)"
                @click="formState.condition = cond.value"
              />
            </div>
          </div>

          <!-- Status de Manutenção -->
          <div class="form-group full-width">
            <label>Status de Manutenção</label>
            <div class="maintenance-selector-pills" role="radiogroup" aria-label="Status de Manutenção">
              <MaintenancePill 
                :maintenance="false"
                :active="!formState.maintenance"
                @click="formState.maintenance = false"
              />
              <MaintenancePill 
                :maintenance="true"
                :active="formState.maintenance"
                @click="formState.maintenance = true"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="form-actions full-width">
        <button 
          v-if="computedShowCancel" 
          type="button" 
          class="m3-btn m3-btn--tonal" 
          :disabled="isSaving" 
          @click="emit('cancel')"
        >
          Cancelar
        </button>
        <button type="submit" class="m3-btn m3-btn--filled m3-btn--has-icon" :disabled="isSaving">
          <span class="material-symbols" style="--md-sym-opsz: 18">{{ computedSubmitIcon }}</span>
          <span>{{ computedSubmitLabel }}</span>
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.notebook-form-container {
  width: 100%;
}

.notebook-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 2px;
}

.section-icon {
  font-size: 20px;
  color: var(--md-sys-color-primary);
}

.section-title {
  margin: 0;
  font: var(--md-sys-typescale-title-small);
  color: var(--md-sys-color-primary);
  font-weight: 600;
  letter-spacing: 0.2px;
}

.section-divider {
  height: 1px;
  background-color: var(--md-sys-color-outline-variant);
  width: 100%;
  margin: 2px 0;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 14px 16px;
  width: 100%;
}

.full-width-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  font: var(--md-sys-typescale-label-medium);
  color: var(--md-sys-color-on-surface-variant);
  font-weight: 600;
}

.m3-input {
  width: 100%;
  height: 42px;
  padding: 0 14px;
  border-radius: var(--md-sys-shape-small);
  border: 1px solid var(--md-sys-color-outline-variant);
  background-color: var(--md-sys-color-surface);
  color: var(--md-sys-color-on-surface);
  font: var(--md-sys-typescale-body-medium);
  box-sizing: border-box;
  transition: border-color 150ms ease, box-shadow 150ms ease;
}

.m3-input:hover:not(:focus) {
  border-color: var(--md-sys-color-on-surface-variant);
}

.m3-input:focus {
  outline: none;
  border-color: var(--md-sys-color-primary);
  box-shadow: 0 0 0 2px var(--md-sys-color-primary-container);
}

.m3-input.monospace {
  font-family: monospace;
}

.cart-selector-pills,
.condition-selector-pills,
.maintenance-selector-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 4px;
}

.cart-custom-input {
  margin-top: 4px;
}

.error-banner {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #FFEBEE;
  color: #C62828;
  padding: 10px 14px;
  border-radius: var(--md-sys-shape-small);
  font: var(--md-sys-typescale-body-small);
  margin-bottom: 16px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid var(--md-sys-color-outline-variant);
  margin-top: 4px;
}
</style>

