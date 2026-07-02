<template>
  <div>
    <h1>Atualizar Manutenção</h1>

    <div v-if="equipment">
      <p><strong>ID:</strong> {{ equipment.id }}</p>
      <p><strong>Tipo:</strong> {{ equipment.type }}</p>
      <p><strong>Modelo:</strong> {{ equipment.model }}</p>
      <p><strong>Serial:</strong> {{ equipment.serialNumber }}</p>

      <form @submit.prevent="">
        <label>Em Manutenção:</label>
        <select v-model="isUnderMaintenance">
          <option :value="true">Sim (Ativar)</option>
          <option :value="false">Não (Desativar)</option>
        </select>
        <button type="submit">Salvar</button>
      </form>
    </div>

    <p v-else-if="isLoading">Carregando dados...</p>

    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
    <p v-if="isSuccess" style="color: green;">Atualizado com sucesso!</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// import { getEquipmentById, updateEquipmentMaintenance } from '@firebase/data-connect'

const props = defineProps<{
  id: string
}>()

type EquipmentType = 'notebook' | 'desktop' | 'chromebook' | 'tablet' | 'tv'

interface Equipment {
  id: string
  type: EquipmentType
  model: string
  serialNumber: string
  isUnderMaintenance: boolean
}

const equipment = ref<Equipment | null>(null)
const isUnderMaintenance = ref<boolean>(false)
const isLoading = ref<boolean>(true)
const errorMessage = ref<string>('')
const isSuccess = ref<boolean>(false)

onMounted(async () => {
//   try {
//     const { data } = await getEquipmentById({ id: props.id })
//     if (data && data.equipment) {
//       equipment.value = data.equipment as Equipment
//       isUnderMaintenance.value = data.equipment.isUnderMaintenance
//     } else {
//       errorMessage.value = 'Equipamento não encontrado.'
//     }
//   } catch (error: any) {
//     errorMessage.value = 'Erro ao buscar: ' + error.message
//   } finally {
//     isLoading.value = false
//   }
})

// const updateStatus = async () => {
//   errorMessage.value = ''
//   isSuccess.value = false

//   try {
//     await updateEquipmentMaintenance({
//       id: props.id,
//       isUnderMaintenance: isUnderMaintenance.value
//     })
//     isSuccess.value = true
//   } catch (error: any) {
//     errorMessage.value = 'Erro ao atualizar: ' + error.message
//   }
// }
</script>