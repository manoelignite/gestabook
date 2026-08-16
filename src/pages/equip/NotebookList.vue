<template>
  <div class="notebook-list-page">
    <!-- CABEÇALHO COM FILTROS -->
    <div class="header-section">
      <div class="title-row">
        <h2 class="page-title">Notebooks</h2>
      </div>

      <!-- SELETORES DE FILTRO (PILLS) -->
      <div class="filters-container">
        <!-- Filtro por Carrinhos -->
        <div class="filter-group">
          <span class="filter-label">Carrinhos:</span>
          <div class="pills-grid">
            <FilterPill 
              label="Todos"
              :active="selectedCart === null && selectedPreset === null"
              @click="clearFilters"
            />
            <FilterPill 
              v-for="cart in cartOptions" 
              :key="cart" 
              :label="cart"
              icon="charger"
              :active="selectedCart === cart"
              @click="toggleCartFilter(cart)"
            />
          </div>
        </div>

        <!-- Filtro por Marca / Modelo -->
        <div class="filter-group">
          <span class="filter-label">Modelos Frequentes:</span>
          <div class="pills-grid">
            <FilterPill 
              v-for="preset in modelPresets" 
              :key="preset.label" 
              :label="preset.label"
              icon="laptop_mac"
              :active="selectedPreset?.label === preset.label"
              @click="togglePresetFilter(preset)"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- LISTA COMPLETA DE NOTEBOOKS -->
    <div class="list-section">
      <div class="list-info-bar">
        <span v-if="isFilterActive" class="info-text">
          Filtrando por: <strong>{{ activeFilterText }}</strong> ({{ filteredNotebooks.length }} encontrados)
        </span>
        <span v-else class="info-text">
          Exibindo todos os <strong>{{ filteredNotebooks.length }} notebooks</strong> cadastrados:
        </span>
      </div>

      <div v-if="filteredNotebooks.length > 0" class="notebooks-list">
        <NotebookListItem 
          v-for="item in filteredNotebooks" 
          :key="item.id || item.serialNumber" 
          :notebook="item"
          :selected-cart="selectedCart"
          @click="openNotebookDetails"
          @cart-click="toggleCartFilter"
        />
      </div>

      <div v-else class="empty-state">
        <span class="material-symbols" style="--md-sym-opsz: 48">inventory_2</span>
        <p v-if="isFilterActive">Nenhum notebook encontrado para os filtros selecionados.</p>
        <p v-else>Nenhum notebook cadastrado ainda.</p>
        <button v-if="isFilterActive" class="m3-btn m3-btn--tonal" @click="clearFilters">
          Limpar Filtros
        </button>
      </div>
    </div>

    <!-- MODAL DE DETALHES DO NOTEBOOK (COMPONENTE ISOLADO NotebookDetailModal) -->
    <NotebookDetailModal 
      :notebook="selectedNotebook" 
      @close="closeNotebookDetails" 
      @updated="getAllEquipments"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { database } from '../../config/firebaseConfig';
import FilterPill from '../../components/FilterPill.vue';
import NotebookListItem from '../../components/NotebookListItem.vue';
import NotebookDetailModal from '../../components/NotebookDetailModal.vue';
import { DEFAULT_CART_OPTIONS, MODEL_PRESETS, type NotebookPreset } from '../../types/notebook';

const equipments = ref<any[]>([]);
const selectedNotebook = ref<any | null>(null);

const selectedCart = ref<string | null>(null);
const selectedPreset = ref<NotebookPreset | null>(null);

const cartOptions = DEFAULT_CART_OPTIONS;
const modelPresets = MODEL_PRESETS;


const getAllEquipments = async () => {
  try {
    const querySnapshot = await getDocs(collection(database, 'equipments'));
    equipments.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Erro ao buscar notebooks:', error);
  }
};

const notebooksOnly = computed(() => {
  return equipments.value.filter(item => {
    if (!item.type) return true; // Tratamento para docs sem propriedade type
    return item.type.toLowerCase() === 'notebook';
  });
});

const isFilterActive = computed(() => selectedCart.value !== null || selectedPreset.value !== null);

const activeFilterText = computed(() => {
  const parts: string[] = [];
  if (selectedCart.value) parts.push(`Carrinho: ${selectedCart.value}`);
  if (selectedPreset.value) parts.push(`Modelo: ${selectedPreset.value.label}`);
  return parts.join(' | ');
});

const filteredNotebooks = computed(() => {
  return notebooksOnly.value.filter(item => {
    if (selectedCart.value && item.cart !== selectedCart.value) {
      return false;
    }
    if (selectedPreset.value) {
      const matchBrand = (item.brand || '').toLowerCase().includes(selectedPreset.value.brand.toLowerCase());
      const matchModel = (item.model || '').toLowerCase().includes(selectedPreset.value.model.toLowerCase());
      if (!matchBrand && !matchModel) {
        return false;
      }
    }
    return true;
  });
});

const toggleCartFilter = (cart: string) => {
  if (selectedCart.value === cart) {
    selectedCart.value = null;
  } else {
    selectedCart.value = cart;
  }
};

const togglePresetFilter = (preset: NotebookPreset) => {
  if (selectedPreset.value?.label === preset.label) {
    selectedPreset.value = null;
  } else {
    selectedPreset.value = preset;
  }
};

const clearFilters = () => {
  selectedCart.value = null;
  selectedPreset.value = null;
};

const openNotebookDetails = (item: any) => {
  selectedNotebook.value = item;
};

const closeNotebookDetails = () => {
  selectedNotebook.value = null;
};

onMounted(() => {
  getAllEquipments();
});
</script>

<style scoped>
.notebook-list-page {
  padding: 36px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  flex-grow: 1;
  width: 100%;
  box-sizing: border-box;
}

.header-section {
  width: 100%;
  max-width: 840px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.title-row {
  display: flex;
  align-items: center;
  gap: 16px;
}

.page-title {
  margin: 0;
  font: var(--md-sys-typescale-headline-medium);
  color: var(--md-sys-color-on-surface);
}

.filters-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: var(--md-sys-color-surface-container-low);
  padding: 16px;
  border-radius: var(--md-sys-shape-medium);
  border: 1px solid var(--md-sys-color-outline-variant);
  box-sizing: border-box;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.filter-label {
  font: var(--md-sys-typescale-label-medium);
  color: var(--md-sys-color-on-surface-variant);
  text-align: left;
}

.pills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.pill-btn {
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

.pill-btn:hover {
  background-color: var(--md-sys-color-surface-container-high);
  color: var(--md-sys-color-on-surface);
}

.pill-btn.active {
  background-color: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
  border-color: var(--md-sys-color-primary);
  font-weight: 600;
  box-shadow: var(--md-sys-elevation-1);
}

.list-section {
  width: 100%;
  max-width: 840px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.list-info-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font: var(--md-sys-typescale-body-medium);
  color: var(--md-sys-color-on-surface-variant);
}

.notebooks-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.notebook-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 20px;
  background-color: var(--md-sys-color-surface-container-low);
  border-radius: var(--md-sys-shape-medium);
  border: 1px solid var(--md-sys-color-outline-variant);
  cursor: pointer;
  transition: background-color 150ms ease, box-shadow 150ms ease;
  text-align: left;
}

.notebook-item:hover {
  background-color: var(--md-sys-color-surface-container-high);
  box-shadow: var(--md-sys-elevation-1);
}

.item-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
  width: 42px;
  height: 42px;
  border-radius: var(--md-sys-shape-full);
  flex-shrink: 0;
}

.item-details {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
}

.item-title {
  font: var(--md-sys-typescale-title-medium);
  color: var(--md-sys-color-on-surface);
}

.item-subdetails {
  display: flex;
  align-items: center;
  gap: 6px;
  font: var(--md-sys-typescale-body-small);
  color: var(--md-sys-color-on-surface-variant);
  flex-wrap: wrap;
}

.item-cart {
  display: flex;
  align-items: center;
  gap: 3px;
}

.separator {
  color: var(--md-sys-color-outline-variant);
}

.item-pills {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  flex-shrink: 0;
}

.item-pill-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  height: 28px;
  border-radius: var(--md-sys-shape-full);
  font: var(--md-sys-typescale-label-small);
  font-weight: 600;
  box-sizing: border-box;
  user-select: none;
}

.cart-pill-item {
  border: 1px solid var(--md-sys-color-outline-variant);
  background-color: var(--md-sys-color-surface-container);
  color: var(--md-sys-color-on-surface-variant);
  cursor: pointer;
  transition: all 150ms cubic-bezier(0.2, 0, 0, 1);
}

.cart-pill-item:hover {
  background-color: var(--md-sys-color-surface-container-high);
  color: var(--md-sys-color-on-surface);
  transform: translateY(-1px);
}

.cart-pill-item.active {
  background-color: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
  border-color: var(--md-sys-color-primary);
  box-shadow: var(--md-sys-elevation-1);
}

/* BADGES / PILLS DE CONDIÇÃO E MANUTENÇÃO */
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
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

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: var(--md-sys-color-outline);
  padding: 48px 0;
}

/* MODAL DE DETALHES */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 24px;
  box-sizing: border-box;
}

.modal-card {
  width: 100%;
  max-width: 540px;
  max-height: 90vh;
  overflow-y: auto;
  text-align: left;
  animation: modalScaleIn 200ms cubic-bezier(0, 0, 0.2, 1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--md-sys-color-outline-variant);
  margin-bottom: 16px;
}

.modal-header-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.modal-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  background-color: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
  border-radius: var(--md-sys-shape-medium);
}

.modal-category {
  font: var(--md-sys-typescale-label-medium);
  color: var(--md-sys-color-primary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.modal-title {
  margin: 2px 0 0 0;
  font: var(--md-sys-typescale-headline-small);
  color: var(--md-sys-color-on-surface);
}

.modal-close-btn {
  background: none;
  border: none;
  color: var(--md-sys-color-on-surface-variant);
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 150ms ease;
}

.modal-close-btn:hover {
  background-color: var(--md-sys-color-surface-container-high);
}

.modal-body-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-bottom: 24px;
}

.info-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  background-color: var(--md-sys-color-surface-container-low);
  padding: 10px 14px;
  border-radius: var(--md-sys-shape-small);
  border: 1px solid var(--md-sys-color-outline-variant);
}

.info-field.full-width {
  grid-column: 1 / -1;
}

.field-label {
  font: var(--md-sys-typescale-label-small);
  color: var(--md-sys-color-on-surface-variant);
}

.field-value {
  font: var(--md-sys-typescale-body-medium);
  color: var(--md-sys-color-on-surface);
  font-weight: 500;
}

.field-value.monospace {
  font-family: monospace;
}

.field-value.monospace.small {
  font-size: 11px;
}

.field-value.highlight {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--md-sys-color-primary);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--md-sys-color-outline-variant);
}

/* ANIMAÇÕES DO MODAL */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 200ms ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

@keyframes modalScaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>
