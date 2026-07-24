<template>
  <div class="form-page-container">
    <h2 class="form-title">Cadastro de Equipamento</h2>
    
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="equipmentType">Tipo</label>
        <select 
          id="equipmentType" 
          v-model="equipment.type" 
          required
        >
          <option value="" disabled>Selecione um tipo...</option>
          <option value="notebook">Notebook</option>
          <option value="desktop">Desktop</option>
          <option value="chromebook">Chromebook</option>
          <option value="tablet">Tablet</option>
          <option value="tv">TV</option>
        </select>
      </div>

      <div>
        <label for="equipmentModel">Modelo</label>
        <input 
          id="equipmentModel" 
          v-model.trim="equipment.model" 
          type="text" 
          placeholder="Ex: Dell Latitude 5430"
          required
        >
      </div>

      <div>
        <label for="serialNumber">Número de Série</label>
        <input 
          id="serialNumber" 
          v-model.trim="equipment.serialNumber" 
          type="text" 
          placeholder="Ex: BR12345XX"
          required
        >
      </div>

      <button class="m3-btn m3-btn--filled" type="submit">
        <span class="material-symbols" style="--md-sym-opsz: 18">save</span>
        <span>Cadastrar</span>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { addDoc, collection } from 'firebase/firestore'
import { ref } from 'vue'
import { database } from '../config/firebaseConfig'

interface EquipmentPayload {
  type: string
  model: string
  serialNumber: string
}

const createInitialState = (): EquipmentPayload => ({
  type: '',
  model: '',
  serialNumber: ''
})

const equipment = ref(createInitialState())

const handleSubmit = () => {
  onSubmit({ ...equipment.value })
  resetForm()
}

const onSubmit = async (payload: EquipmentPayload) => {
  try {
    await addDoc(collection(database, 'equipments'), payload);
  } catch (error) {
    
  }
}

const resetForm = () => {
  equipment.value = createInitialState()
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

.m3-btn {
  margin-top: 12px;
  width: 100%;
}
</style>
