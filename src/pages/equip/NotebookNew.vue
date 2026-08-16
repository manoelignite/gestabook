<template>
  <div class="form-page-container">
    <h2 class="form-title">Cadastro de Notebook</h2>
    
    <div class="presets-bar">
      <span class="presets-label">Preenchimento Rápido:</span>
      <div class="pills-grid">
        <FilterPill 
          v-for="preset in MODEL_PRESETS" 
          :key="preset.label" 
          :label="preset.label" 
          icon="laptop_mac" 
          @click="applyPreset(preset.brand, preset.model)" 
        />
      </div>
    </div>

    <div class="form-wrapper">
      <p v-if="successMessage" class="feedback-message success">{{ successMessage }}</p>
      <NotebookForm 
        mode="create" 
        :notebook="notebook" 
        :is-saving="isSubmitting" 
        :error-message="errorMessage" 
        @save="handleSubmit" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { addDoc, collection } from 'firebase/firestore'
import { database } from '../../config/firebaseConfig'
import { MODEL_PRESETS, type Notebook, type NotebookCondition } from '../../types/notebook'
import { FilterPill } from '../../components/pills'
import NotebookForm from '../../components/NotebookForm.vue'

const route = useRoute()

const createInitialState = (): Omit<Notebook, 'id'> => ({
  brand: '',
  model: '',
  serialNumber: '',
  cart: 'Carrinho 1',
  number: 1,
  condition: 'excelente' as NotebookCondition,
  maintenance: false
})

const notebook = ref(createInitialState())
const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const applyPreset = (brand: string, model: string) => {
  notebook.value = {
    ...notebook.value,
    brand,
    model
  }
}

onMounted(() => {
  if (route.query.brand || route.query.model) {
    notebook.value = {
      ...notebook.value,
      brand: route.query.brand ? String(route.query.brand) : notebook.value.brand,
      model: route.query.model ? String(route.query.model) : notebook.value.model
    }
  }
})

const handleSubmit = async (formData: Omit<Notebook, 'id'>) => {
  isSubmitting.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    const payload = {
      type: 'notebook',
      ...formData
    }
    await addDoc(collection(database, 'equipments'), payload)
    successMessage.value = 'Notebook cadastrado com sucesso!'
    resetForm(formData)
  } catch (error) {
    console.error('Erro ao cadastrar notebook:', error)
    errorMessage.value = 'Falha ao cadastrar o notebook. Tente novamente.'
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = (lastSaved: Omit<Notebook, 'id'>) => {
  notebook.value = {
    ...createInitialState(),
    brand: lastSaved.brand || '',
    model: lastSaved.model || '',
    cart: lastSaved.cart || 'Carrinho 1',
    number: (lastSaved.number ?? 0) + 1
  }
}
</script>

<style scoped>
.form-page-container {
  padding: 48px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  flex-grow: 1;
}

.form-title {
  font: var(--md-sys-typescale-headline-medium);
  color: var(--md-sys-color-on-surface);
}

.presets-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
  max-width: 480px;
}

.presets-label {
  font: var(--md-sys-typescale-label-medium);
  color: var(--md-sys-color-on-surface-variant);
}

.pills-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}

.pill-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  height: 34px;
  border-radius: var(--md-sys-shape-full);
  border: 1px solid var(--md-sys-color-outline-variant);
  background-color: var(--md-sys-color-secondary-container);
  color: var(--md-sys-color-on-secondary-container);
  font: var(--md-sys-typescale-label-large);
  cursor: pointer;
  transition: background-color 200ms cubic-bezier(0.2, 0, 0, 1),
              box-shadow 200ms cubic-bezier(0.2, 0, 0, 1);
}

.pill-btn:hover {
  background-color: var(--md-sys-color-tertiary-container);
  color: var(--md-sys-color-on-tertiary-container);
  box-shadow: var(--md-sys-elevation-1);
}

.equipment-form {
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.m3-btn {
  margin-top: 12px;
  width: 100%;
}

.feedback-message {
  font: var(--md-sys-typescale-body-medium);
  text-align: center;
  margin-top: 8px;
}

.feedback-message.success {
  color: var(--md-sys-color-primary);
}

.feedback-message.error {
  color: var(--md-sys-color-error);
}

.cart-field-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cart-pills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.cart-pill-btn {
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
}

.cart-pill-btn:hover {
  background-color: var(--md-sys-color-surface-container-high);
  color: var(--md-sys-color-on-surface);
}

.cart-pill-btn.active {
  background-color: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
  border-color: var(--md-sys-color-primary);
  font-weight: 600;
  box-shadow: var(--md-sys-elevation-1);
}
</style>
