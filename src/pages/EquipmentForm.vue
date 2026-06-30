<template>
  <div>
    <h2>Cadastro de Equipamento</h2>
    
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="equipmentType">Tipo:</label>
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
        <label for="equipmentModel">Modelo:</label>
        <input 
          id="equipmentModel" 
          v-model.trim="equipment.model" 
          type="text" 
          required
        >
      </div>

      <div>
        <label for="serialNumber">Número de Série:</label>
        <input 
          id="serialNumber" 
          v-model.trim="equipment.serialNumber" 
          type="text" 
          required
        >
      </div>

      <button type="submit">Cadastrar</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const createInitialState = () => ({
  type: '',
  model: '',
  serialNumber: ''
})

const equipment = ref(createInitialState())

const handleSubmit = () => {
  onSubmit({ ...equipment.value })
  resetForm()
}

const onSubmit = (payload) => {
  console.log('Payload enviado:', payload)
}

const resetForm = () => {
  equipment.value = createInitialState()
}
</script>
