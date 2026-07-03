<template>
  <div>
    <h2>Lista de Equipamentos</h2>
    <ul>
      <!-- Renderiza a lista na tela -->
      <li :key="item.id" v-for="item in equipments">
        {{ item.id }} - {{ item.model }} ({{ item.type }}) - SN: {{ item.serialNumber }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { database } from '../config/firebaseConfig';

const equipments = ref<any[]>([]);

const getAllEquipments = async () => {
  try {
    const querySnapshot = await getDocs(collection(database, 'equipments'));
    equipments.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error(error);
  }
};

// Dispara a busca quando a tela renderizar
onMounted(() => {
  getAllEquipments();
});
</script>