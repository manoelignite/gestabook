<template>
  <div class="list-page-container">
    <h2 class="list-title">Lista de Equipamentos</h2>
    
    <div v-if="equipments.length > 0" class="equipments-list">
      <div v-for="item in equipments" :key="item.id" class="m3-list-item">
        <div class="item-icon">
          <span class="material-symbols" style="--md-sym-opsz: 24">
            {{ getIconForType(item.type) }}
          </span>
        </div>
        <div class="item-details">
          <div class="item-model">{{ item.model }}</div>
          <div class="item-subdetails">
            <span class="item-type">{{ capitalize(item.type) }}</span>
            <span class="separator">•</span>
            <span class="item-sn">SN: {{ item.serialNumber }}</span>
          </div>
        </div>
        <div class="item-actions">
          <span class="item-id-badge">ID: {{ item.id.substring(0, 6) }}</span>
        </div>
      </div>
    </div>
    
    <div v-else class="empty-state">
      <span class="material-symbols" style="--md-sym-opsz: 48">inventory_2</span>
      <p>Nenhum equipamento cadastrado ainda.</p>
    </div>
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

const getIconForType = (type: string) => {
  switch (type?.toLowerCase()) {
    case 'notebook': return 'laptop_mac'
    case 'desktop': return 'desktop_windows'
    case 'chromebook': return 'laptop_chromebook'
    case 'tablet': return 'tablet_mac'
    case 'tv': return 'tv'
    default: return 'devices'
  }
}

const capitalize = (text: string) => {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1)
}

onMounted(() => {
  getAllEquipments();
});
</script>

<style scoped>
.list-page-container {
  padding: 48px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  flex-grow: 1;
}

.list-title {
  font: var(--md-sys-typescale-headline-medium);
  color: var(--md-sys-color-on-surface);
}

.equipments-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 680px;
}

.m3-list-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  background-color: var(--md-sys-color-surface-container-low);
  border-radius: var(--md-sys-shape-medium);
  border: 1px solid var(--md-sys-color-outline-variant);
  transition: background-color 200ms cubic-bezier(0.2, 0, 0, 1),
              box-shadow 200ms cubic-bezier(0.2, 0, 0, 1);
}

.m3-list-item:hover {
  background-color: var(--md-sys-color-surface-container-high);
  box-shadow: var(--md-sys-elevation-1);
}

.item-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
  width: 48px;
  height: 48px;
  border-radius: var(--md-sys-shape-full);
}

.item-details {
  display: flex;
  flex-direction: column;
  text-align: left;
  flex-grow: 1;
}

.item-model {
  font: var(--md-sys-typescale-title-medium);
  color: var(--md-sys-color-on-surface);
}

.item-subdetails {
  font: var(--md-sys-typescale-body-medium);
  color: var(--md-sys-color-on-surface-variant);
  display: flex;
  gap: 8px;
}

.separator {
  color: var(--md-sys-color-outline-variant);
}

.item-id-badge {
  font: var(--md-sys-typescale-label-small);
  color: var(--md-sys-color-outline);
  background-color: var(--md-sys-color-surface-container-highest);
  padding: 4px 8px;
  border-radius: var(--md-sys-shape-extra-small);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: var(--md-sys-color-outline);
  margin-top: 48px;
}
</style>