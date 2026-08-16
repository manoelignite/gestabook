<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { CartPill, ConditionPill, MaintenancePill } from './pills'
import { 
  DEFAULT_CART_OPTIONS, 
  CONDITION_OPTIONS, 
  type Notebook, 
  type NotebookCondition 
} from '../types/notebook'

const props = defineProps<{
  notebook: Notebook
  isSaving?: boolean
  errorMessage?: string | null
}>()

const emit = defineEmits<{
  (e: 'save', formData: Omit<Notebook, 'id'>): void
  (e: 'cancel'): void
}>()

const editForm = ref({
  brand: '',
  model: '',
  serialNumber: '',
  cart: '',
  number: null as number | null,
  condition: 'excelente' as NotebookCondition | string,
  maintenance: false
})

const availableCartOptions = computed(() => {
  const options = [...DEFAULT_CART_OPTIONS]
  const currentCart = editForm.value.cart?.trim()
  if (currentCart && !options.some(opt => opt.trim().toLowerCase() === currentCart.toLowerCase())) {
    options.push(currentCart)
  }
  return options
})

const isCartActive = (option: string) => {
  if (!editForm.value.cart) return false
  return editForm.value.cart.trim().toLowerCase() === option.trim().toLowerCase()
}

const conditionOptions = CONDITION_OPTIONS

const isConditionActive = (condValue: string) => {
  if (!editForm.value.condition) return false
  return editForm.value.condition.trim().toLowerCase() === condValue.trim().toLowerCase()
}

const initEditForm = () => {
  if (props.notebook) {
    editForm.value = {
      brand: props.notebook.brand !== undefined && props.notebook.brand !== null ? String(props.notebook.brand) : '',
      model: props.notebook.model !== undefined && props.notebook.model !== null ? String(props.notebook.model) : '',
      serialNumber: props.notebook.serialNumber !== undefined && props.notebook.serialNumber !== null ? String(props.notebook.serialNumber) : '',
      cart: props.notebook.cart !== undefined && props.notebook.cart !== null ? String(props.notebook.cart) : 'Carrinho 1',
      number: props.notebook.number ?? null,
      condition: props.notebook.condition ? String(props.notebook.condition).toLowerCase() : 'excelente',
      maintenance: !!props.notebook.maintenance
    }
  }
}

watch(() => props.notebook, () => {
  initEditForm()
}, { immediate: true, deep: true })

const handleSubmit = () => {
  emit('save', {
    brand: String(editForm.value.brand || '').trim(),
    model: String(editForm.value.model || '').trim(),
    serialNumber: String(editForm.value.serialNumber || '').trim(),
    cart: String(editForm.value.cart || '').trim(),
    number: editForm.value.number !== null && editForm.value.number !== undefined && editForm.value.number !== ('' as any) ? Number(editForm.value.number) : undefined,
    condition: editForm.value.condition,
    maintenance: editForm.value.maintenance
  })
}
</script>

<template>
  <div class="notebook-edit-form-container">
    <div v-if="errorMessage" class="error-banner">
      <span class="material-symbols" style="--md-sym-opsz: 18">error</span>
      <span>{{ errorMessage }}</span>
    </div>

    <form @submit.prevent="handleSubmit" class="edit-form-grid">
      <div class="form-group">
        <label for="editBrand">Marca</label>
        <input 
          id="editBrand" 
          v-model="editForm.brand" 
          type="text" 
          class="m3-input"
          placeholder="Ex: Dell, Lenovo, HP"
          required
        />
      </div>

      <div class="form-group">
        <label for="editModel">Modelo</label>
        <input 
          id="editModel" 
          v-model="editForm.model" 
          type="text" 
          class="m3-input"
          placeholder="Ex: Latitude 5430"
          required
        />
      </div>

      <div class="form-group">
        <label for="editSN">Número de Série (SN)</label>
        <input 
          id="editSN" 
          v-model="editForm.serialNumber" 
          type="text" 
          class="m3-input monospace"
          placeholder="Ex: BR12345XX"
          required
        />
      </div>

      <div class="form-group">
        <label for="editNumber">Número do Equipamento</label>
        <input 
          id="editNumber" 
          v-model.number="editForm.number" 
          type="number" 
          class="m3-input"
          placeholder="Ex: 12"
        />
      </div>

      <!-- Campo de Carrinho -->
      <div class="form-group full-width">
        <label>Identificação do Carrinho</label>
        <div class="cart-selector-pills">
          <CartPill 
            v-for="cartOption in availableCartOptions" 
            :key="cartOption" 
            :cart="cartOption"
            :active="isCartActive(cartOption)"
            @click="editForm.cart = cartOption"
          />
        </div>
        <input 
          v-model="editForm.cart" 
          type="text" 
          class="m3-input cart-custom-input"
          placeholder="Ou digite o nome do carrinho..."
          required
        />
      </div>

      <!-- Campo de Condição -->
      <div class="form-group full-width">
        <label>Condição do Notebook</label>
        <div class="condition-selector-pills">
          <ConditionPill 
            v-for="cond in conditionOptions" 
            :key="cond.value" 
            :condition="cond.value"
            :active="isConditionActive(cond.value)"
            @click="editForm.condition = cond.value"
          />
        </div>
      </div>

      <!-- Status de Manutenção -->
      <div class="form-group full-width">
        <label>Status de Manutenção</label>
        <div class="maintenance-selector-pills">
          <MaintenancePill 
            :maintenance="false"
            :active="!editForm.maintenance"
            @click="editForm.maintenance = false"
          />
          <MaintenancePill 
            :maintenance="true"
            :active="editForm.maintenance"
            @click="editForm.maintenance = true"
          />
        </div>
      </div>

      <div class="modal-actions full-width">
        <button type="button" class="m3-btn m3-btn--tonal" :disabled="isSaving" @click="emit('cancel')">
          Cancelar
        </button>
        <button type="submit" class="m3-btn m3-btn--filled m3-btn--has-icon" :disabled="isSaving">
          <span class="material-symbols" style="--md-sym-opsz: 18">{{ isSaving ? 'sync' : 'save' }}</span>
          <span>{{ isSaving ? 'Salvando...' : 'Salvar Alterações' }}</span>
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.notebook-edit-form-container {
  width: 100%;
}

.edit-form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
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
  height: 42px;
  padding: 0 12px;
  border-radius: var(--md-sys-shape-small);
  border: 1px solid var(--md-sys-color-outline);
  background-color: var(--md-sys-color-surface);
  color: var(--md-sys-color-on-surface);
  font: var(--md-sys-typescale-body-medium);
  box-sizing: border-box;
  transition: border-color 150ms ease, box-shadow 150ms ease;
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
  margin-bottom: 6px;
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

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid var(--md-sys-color-outline-variant);
}
</style>
