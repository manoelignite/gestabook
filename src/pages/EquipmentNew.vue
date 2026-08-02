<template>
  <div class="form-page-container">
    <h2 class="form-title">Cadastro de Notebook</h2>
    
    <form @submit.prevent="handleSubmit" class="equipment-form">
      <div>
        <label for="notebookBrand">Marca</label>
        <input 
          id="notebookBrand" 
          v-model.trim="notebook.brand" 
          type="text" 
          placeholder="Ex: Dell, Lenovo, HP"
          required
        >
      </div>

      <div>
        <label for="notebookModel">Modelo</label>
        <input 
          id="notebookModel" 
          v-model.trim="notebook.model" 
          type="text" 
          placeholder="Ex: Latitude 5430"
          required
        >
      </div>

      <div>
        <label for="notebookSerialNumber">Número de Série (Serial Number)</label>
        <input 
          id="notebookSerialNumber" 
          v-model.trim="notebook.serialNumber" 
          type="text" 
          placeholder="Ex: BR12345XX"
          required
        >
      </div>

      <div>
        <label for="notebookCart">Carrinho</label>
        <input 
          id="notebookCart" 
          v-model.number="notebook.cart" 
          type="number" 
          min="1"
          placeholder="Ex: 1"
          required
        >
      </div>

      <div>
        <label for="notebookNumber">Número</label>
        <input 
          id="notebookNumber" 
          v-model.number="notebook.number" 
          type="number" 
          min="1"
          placeholder="Ex: 12"
          required
        >
      </div>

      <div>
        <label for="notebookCondition">Condição</label>
        <select 
          id="notebookCondition" 
          v-model="notebook.condition" 
          required
        >
          <option value="" disabled>Selecione a condição...</option>
          <option value="excelente">Excelente</option>
          <option value="boa">Boa</option>
          <option value="ruim">Ruim</option>
        </select>
      </div>

      <div>
        <label for="notebookMaintenance">Em Manutenção</label>
        <select 
          id="notebookMaintenance" 
          v-model="notebook.maintenance" 
          required
        >
          <option :value="false">Não</option>
          <option :value="true">Sim</option>
        </select>
      </div>

      <button class="m3-btn m3-btn--filled" type="submit" :disabled="isSubmitting">
        <span class="material-symbols" style="--md-sym-opsz: 18">save</span>
        <span>{{ isSubmitting ? 'Cadastrando...' : 'Cadastrar Notebook' }}</span>
      </button>

      <p v-if="successMessage" class="feedback-message success">{{ successMessage }}</p>
      <p v-if="errorMessage" class="feedback-message error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { addDoc, collection } from 'firebase/firestore'
import { database } from '../config/firebaseConfig'
import type { Notebook, NotebookCondition } from '../types/notebook'

const createInitialState = (): Omit<Notebook, 'id'> => ({
  brand: '',
  model: '',
  serialNumber: '',
  cart: 1,
  number: 1,
  condition: '' as NotebookCondition,
  maintenance: false
})

const notebook = ref(createInitialState())
const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const handleSubmit = async () => {
  isSubmitting.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    const payload = {
      type: 'notebook',
      ...notebook.value
    }
    await addDoc(collection(database, 'equipments'), payload)
    successMessage.value = 'Notebook cadastrado com sucesso!'
    resetForm()
  } catch (error) {
    console.error('Erro ao cadastrar notebook:', error)
    errorMessage.value = 'Falha ao cadastrar o notebook. Tente novamente.'
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  notebook.value = createInitialState()
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
</style>
