<template>
  <div class="form-page-container">
    <h2 class="form-title">Cadastro de Notebook</h2>
    
    <div class="presets-bar">
      <span class="presets-label">Preenchimento Rápido:</span>
      <div class="pills-grid">
        <FilterPill label="Samsung Chromebook" icon="laptop_mac" @click="applyPreset('Samsung', 'Chromebook')" />
        <FilterPill label="Positivo Master N8440" icon="laptop_mac" @click="applyPreset('Positivo', 'Master N8440')" />
        <FilterPill label="ThinkPad L14" icon="laptop_mac" @click="applyPreset('Lenovo', 'ThinkPad L14')" />
        <FilterPill label="Positivo Master N1110" icon="laptop_mac" @click="applyPreset('Positivo', 'Master N1110')" />
        <FilterPill label="Positivo Master N1210" icon="laptop_mac" @click="applyPreset('Positivo', 'Master N1210')" />
      </div>
    </div>

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

      <div class="cart-field-container">
        <label for="notebookCart">Identificação do Carrinho</label>
        <div class="cart-pills-grid">
          <CartPill 
            v-for="option in cartOptions" 
            :key="option" 
            :cart="option"
            :active="notebook.cart === option" 
            @click="notebook.cart = option"
          />
        </div>
        <input 
          id="notebookCart" 
          v-model.trim="notebook.cart" 
          type="text" 
          placeholder="Ou digite a identificação..."
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
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { addDoc, collection } from 'firebase/firestore'
import { database } from '../../config/firebaseConfig'
import { DEFAULT_CART_OPTIONS, type Notebook, type NotebookCondition } from '../../types/notebook'
import { FilterPill, CartPill } from '../../components/pills'

const route = useRoute()

const cartOptions = DEFAULT_CART_OPTIONS


const createInitialState = (): Omit<Notebook, 'id'> => ({
  brand: '',
  model: '',
  serialNumber: '',
  cart: 'Carrinho 1',
  number: 1,
  condition: '' as NotebookCondition,
  maintenance: false
})

const notebook = ref(createInitialState())
const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const applyPreset = (brand: string, model: string) => {
  notebook.value.brand = brand
  notebook.value.model = model
}

onMounted(() => {
  if (route.query.brand) {
    notebook.value.brand = String(route.query.brand)
  }
  if (route.query.model) {
    notebook.value.model = String(route.query.model)
  }
})

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
  const currentBrand = notebook.value.brand
  const currentModel = notebook.value.model
  const currentCart = notebook.value.cart
  const currentNumber = notebook.value.number

  notebook.value = {
    ...createInitialState(),
    brand: currentBrand || '',
    model: currentModel || '',
    cart: currentCart || 'Carrinho 1',
    number: (currentNumber ?? 0) + 1
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
