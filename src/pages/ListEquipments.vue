<template>
  <div class="m3-page-layout">
    <div class="m3-page-header">
      <h2 class="m3-page-header__title">Lista de Equipamentos</h2>
      <p class="m3-page-header__subtitle">Selecione uma categoria para visualizar a lista completa</p>
    </div>

    <div class="m3-page-content">
      <!-- SEÇÃO DE NOTEBOOKS (CLICÁVEL - NAVEGA PARA /notebook/list VIA VUE-ROUTER) -->
      <section 
        class="m3-surface-card m3-card--interactive equipment-section-card" 
        tabindex="0"
        @click="navigateToNotebookList"
      >
        <div class="section-header">
          <div class="header-main">
            <div class="section-icon">
              <span class="material-symbols" style="--md-sym-opsz: 28">laptop_mac</span>
            </div>
            <div class="section-titles">
              <h3 class="section-title">Notebooks</h3>
              <p class="section-subtitle">Gestão de notebooks e chromebooks</p>
            </div>
          </div>

          <div class="header-action">
            <span class="view-all-text">Ver todos</span>
            <span class="material-symbols" style="--md-sym-opsz: 20">chevron_right</span>
          </div>
        </div>

        <!-- LISTA DOS 3 ÚLTIMOS CADASTRADOS (FORMATO DE LISTA) -->
        <div class="section-preview-list">
          <span class="preview-label">Últimos 3 cadastrados:</span>

          <div v-if="recentNotebooks.length > 0" class="items-list">
            <NotebookListItem 
              v-for="item in recentNotebooks" 
              :key="item.id || item.serialNumber" 
              :notebook="item"
              @click="navigateToNotebookList"
            />
          </div>

          <div v-else class="empty-preview">
            <p>Nenhum notebook cadastrado nesta seção.</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { collection, getDocs } from 'firebase/firestore';
import { database } from '../config/firebaseConfig';
import NotebookListItem from '../components/NotebookListItem.vue';

const router = useRouter();
const equipments = ref<any[]>([]);

const getAllEquipments = async () => {
  try {
    const querySnapshot = await getDocs(collection(database, 'equipments'));
    equipments.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Erro ao buscar equipamentos:', error);
  }
};

const notebooksOnly = computed(() => {
  return equipments.value.filter(item => {
    if (!item.type) return true;
    return item.type.toLowerCase() === 'notebook';
  });
});

// Apenas os últimos 3 cadastrados para exibição prévia na página principal
const recentNotebooks = computed(() => {
  return notebooksOnly.value.slice(-3).reverse();
});

const navigateToNotebookList = () => {
  router.push('/notebook/list');
};

onMounted(() => {
  getAllEquipments();
});
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

/* CONTAINER DA SEÇÃO DE NOTEBOOKS */
.equipment-section-card {
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: transform 150ms ease, box-shadow 150ms ease;
  box-sizing: border-box;
}

.equipment-section-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--md-sys-elevation-2);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--md-sys-color-outline-variant);
}

.header-main {
  display: flex;
  align-items: center;
  gap: 14px;
}

.section-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background-color: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
  border-radius: var(--md-sys-shape-medium);
}

.section-titles {
  display: flex;
  flex-direction: column;
}

.section-title {
  margin: 0;
  font: var(--md-sys-typescale-title-large);
  color: var(--md-sys-color-on-surface);
}

.section-subtitle {
  margin: 2px 0 0 0;
  font: var(--md-sys-typescale-body-small);
  color: var(--md-sys-color-on-surface-variant);
}

.header-action {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--md-sys-color-primary);
  font: var(--md-sys-typescale-label-large);
  font-weight: 600;
}

.section-preview-list {
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.preview-label {
  font: var(--md-sys-typescale-label-small);
  color: var(--md-sys-color-on-surface-variant);
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.preview-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background-color: var(--md-sys-color-surface-container-low);
  border-radius: var(--md-sys-shape-small);
  border: 1px solid var(--md-sys-color-outline-variant);
}

.item-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: var(--md-sys-color-surface-container-high);
  color: var(--md-sys-color-primary);
  border-radius: 50%;
  flex-shrink: 0;
}

.item-info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.item-name {
  font: var(--md-sys-typescale-body-medium);
  font-weight: 600;
  color: var(--md-sys-color-on-surface);
}

.item-sub {
  font: var(--md-sys-typescale-body-small);
  color: var(--md-sys-color-on-surface-variant);
}

.item-pills {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.pill-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: var(--md-sys-shape-full);
  border: 1px solid var(--md-sys-color-outline-variant);
  background-color: var(--md-sys-color-surface-container);
  color: var(--md-sys-color-on-surface-variant);
  font: var(--md-sys-typescale-label-small);
  font-weight: 600;
}

/* BADGES */
.badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 8px;
  border-radius: var(--md-sys-shape-extra-small);
  font: var(--md-sys-typescale-label-small);
  font-weight: 600;
}

.badge-success {
  background-color: #E8F5E9;
  color: #2E7D32;
}

.badge-info {
  background-color: #E3F2FD;
  color: #1565C0;
}

.badge-warning {
  background-color: #FFF3E0;
  color: #E65100;
}

.badge-error {
  background-color: #FFEBEE;
  color: #C62828;
}

.badge-neutral {
  background-color: var(--md-sys-color-surface-container-highest);
  color: var(--md-sys-color-on-surface-variant);
}

.empty-preview {
  font: var(--md-sys-typescale-body-small);
  color: var(--md-sys-color-outline);
  padding: 8px 0;
}
</style>