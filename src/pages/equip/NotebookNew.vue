<template>
  <div class="list-page-container">
    <div class="page-header">
      <h2 class="page-title">Cadastro de Notebook</h2>
      <p class="page-subtitle">Preencha os dados do formulário para registrar um novo notebook no inventário</p>
    </div>

    <div class="sections-list">
      <section class="m3-card m3-card--elevated equipment-section-card">
        <div class="m3-card__content">
          <!-- BARRA DE PRESETS -->
          <div class="presets-container">
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

          <div class="section-divider"></div>

          <p v-if="successMessage" class="feedback-message success">{{ successMessage }}</p>

          <NotebookForm 
            mode="create" 
            :notebook="notebook" 
            :is-saving="isSubmitting" 
            :error-message="errorMessage" 
            @save="handleSubmit" 
          />
        </div>
      </section>
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

.presets-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
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

.section-divider {
  height: 1px;
  background-color: var(--md-sys-color-outline-variant);
  width: 100%;
  margin-bottom: 24px;
}

.feedback-message {
  font: var(--md-sys-typescale-body-medium);
  text-align: center;
  margin-bottom: 16px;
  padding: 10px 14px;
  border-radius: var(--md-sys-shape-small);
}

.feedback-message.success {
  background-color: #E8F5E9;
  color: #2E7D32;
  border: 1px solid #C8E6C9;
}

.feedback-message.error {
  background-color: #FFEBEE;
  color: #C62828;
  border: 1px solid #FFCDD2;
}
</style>
