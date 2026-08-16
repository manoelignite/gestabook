<script setup lang="ts">
import { ref, watch } from 'vue'
import { doc, updateDoc } from 'firebase/firestore'
import { database } from '../config/firebaseConfig'
import FilterPill from './FilterPill.vue'
import NotebookEditForm from './NotebookEditForm.vue'
import type { NotebookItem } from './NotebookListItem.vue'

const props = defineProps<{
  notebook: NotebookItem | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'updated'): void
}>()

const isEditing = ref(false)
const isSaving = ref(false)
const errorMessage = ref<string | null>(null)

watch(() => props.notebook, () => {
  isEditing.value = false
  errorMessage.value = null
}, { immediate: true })

const startEditing = () => {
  errorMessage.value = null
  isEditing.value = true
}

const cancelEditing = () => {
  isEditing.value = false
  errorMessage.value = null
}

const saveChanges = async (formData: Omit<NotebookItem, 'id'>) => {
  if (!props.notebook?.id) return

  try {
    isSaving.value = true
    errorMessage.value = null

    const docRef = doc(database, 'equipments', props.notebook.id)
    await updateDoc(docRef, formData as any)

    Object.assign(props.notebook, formData)

    isEditing.value = false
    emit('updated')
  } catch (error: any) {
    console.error('Erro ao salvar alterações do notebook:', error)
    errorMessage.value = 'Erro ao salvar alterações. Tente novamente.'
  } finally {
    isSaving.value = false
  }
}

const getBrandModelText = (item: NotebookItem) => {
  const brand = item.brand || ''
  const model = item.model || ''
  if (brand && model) return `${brand} ${model}`
  if (brand) return brand
  if (model) return model
  return 'Notebook Sem Nome'
}

const getConditionVariant = (condition?: string) => {
  switch (condition?.toLowerCase()) {
    case 'excelente': return 'green'
    case 'boa': return 'blue'
    case 'ruim': return 'orange'
    default: return 'default'
  }
}

const getConditionIcon = (condition?: string) => {
  switch (condition?.toLowerCase()) {
    case 'excelente': return 'sentiment_very_satisfied'
    case 'boa': return 'thumb_up'
    case 'ruim': return 'warning'
    default: return 'help'
  }
}

const capitalize = (text?: string) => {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1)
}

const close = () => {
  if (isSaving.value) return
  isEditing.value = false
  emit('close')
}
</script>

<template>
  <teleport to="body">
    <transition name="modal-fade">
      <div v-if="notebook" class="modal-overlay" @click.self="close">
        <div class="modal-card m3-card m3-card--elevated">
          <div class="m3-card__content">
            <!-- MODO DE LEITURA -->
            <template v-if="!isEditing">
              <div class="modal-header">
                <div class="modal-header-left">
                  <div class="modal-icon">
                    <span class="material-symbols" style="--md-sym-opsz: 32">laptop_mac</span>
                  </div>
                  <div>
                    <span class="modal-category">Notebook</span>
                    <h3 class="modal-title">{{ getBrandModelText(notebook) }}</h3>
                  </div>
                </div>
                <button class="modal-close-btn" aria-label="Fechar" @click="close">
                  <span class="material-symbols" style="--md-sym-opsz: 20">close</span>
                </button>
              </div>

              <div class="modal-body-grid">
                <div class="info-field">
                  <span class="field-label">Marca</span>
                  <span class="field-value">{{ notebook.brand || 'Não informada' }}</span>
                </div>

                <div class="info-field">
                  <span class="field-label">Modelo</span>
                  <span class="field-value">{{ notebook.model || 'Não informado' }}</span>
                </div>

                <div class="info-field">
                  <span class="field-label">Número de Série (SN)</span>
                  <span class="field-value monospace">{{ notebook.serialNumber || 'N/A' }}</span>
                </div>

                <div class="info-field">
                  <span class="field-label">Carrinho</span>
                  <span class="field-value highlight">
                    <span class="material-symbols" style="--md-sym-opsz: 18">charger</span>
                    {{ notebook.cart || 'Sem carrinho' }}
                  </span>
                </div>

                <div class="info-field">
                  <span class="field-label">Número</span>
                  <span class="field-value">#{{ notebook.number ?? 'N/A' }}</span>
                </div>

                <div class="info-field">
                  <span class="field-label">Condição</span>
                  <FilterPill 
                    :label="notebook.condition ? capitalize(notebook.condition) : 'Não informada'"
                    :icon="getConditionIcon(notebook.condition)"
                    :variant="getConditionVariant(notebook.condition)"
                  />
                </div>

                <div class="info-field">
                  <span class="field-label">Status de Manutenção</span>
                  <FilterPill 
                    :label="notebook.maintenance ? 'Em Manutenção' : 'Em Uso / Operacional'"
                    :icon="notebook.maintenance ? 'build' : 'check_circle'"
                    :variant="notebook.maintenance ? 'red' : 'green'"
                  />
                </div>

                <div class="info-field full-width">
                  <span class="field-label">ID do Documento (Firestore)</span>
                  <span class="field-value monospace small">{{ notebook.id }}</span>
                </div>
              </div>

              <div class="modal-actions">
                <button class="m3-btn m3-btn--tonal m3-btn--has-icon" @click="startEditing">
                  <span class="material-symbols" style="--md-sym-opsz: 18">edit</span>
                  <span>Editar Informações</span>
                </button>
                <button class="m3-btn m3-btn--filled" @click="close">
                  Fechar
                </button>
              </div>
            </template>

            <!-- MODO DE EDIÇÃO -->
            <template v-else>
              <div class="modal-header">
                <div class="modal-header-left">
                  <div class="modal-icon edit-icon">
                    <span class="material-symbols" style="--md-sym-opsz: 32">edit_note</span>
                  </div>
                  <div>
                    <span class="modal-category">Modo Edição</span>
                    <h3 class="modal-title">Editar Notebook</h3>
                  </div>
                </div>
                <button class="modal-close-btn" aria-label="Fechar" :disabled="isSaving" @click="cancelEditing">
                  <span class="material-symbols" style="--md-sym-opsz: 20">close</span>
                </button>
              </div>

              <NotebookEditForm 
                :notebook="notebook" 
                :is-saving="isSaving" 
                :error-message="errorMessage"
                @save="saveChanges" 
                @cancel="cancelEditing"
              />
            </template>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
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
  max-width: 580px;
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

.modal-icon.edit-icon {
  background-color: var(--md-sys-color-tertiary-container);
  color: var(--md-sys-color-on-tertiary-container);
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

.modal-close-btn:hover:not(:disabled) {
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

/* FORMULÁRIO DE EDIÇÃO */
.edit-form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  font: var(--md-sys-typescale-label-medium);
  color: var(--md-sys-color-on-surface-variant);
  font-weight: 600;
}

.m3-input {
  height: 42px;
  padding: 0 12px;
  border-radius: var(--md-sys-shape-small);
  border: 1px solid var(--md-sys-color-outline);
  background-color: var(--md-sys-color-surface);
  color: var(--md-sys-color-on-surface);
  font: var(--md-sys-typescale-body-medium);
  box-sizing: border-box;
  transition: border-color 150ms ease, box-shadow 150ms ease;
}

.m3-input:focus {
  outline: none;
  border-color: var(--md-sys-color-primary);
  box-shadow: 0 0 0 2px var(--md-sys-color-primary-container);
}

.m3-input.monospace {
  font-family: monospace;
}

.cart-selector-pills,
.condition-selector-pills,
.maintenance-selector-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 6px;
}

.cart-custom-input {
  margin-top: 4px;
}

.error-banner {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #FFEBEE;
  color: #C62828;
  padding: 10px 14px;
  border-radius: var(--md-sys-shape-small);
  font: var(--md-sys-typescale-body-small);
  margin-bottom: 16px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid var(--md-sys-color-outline-variant);
}

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
