<script setup lang="ts">
import { computed } from 'vue'
import FilterPill from './FilterPill.vue'
import { 
  getConditionVariant, 
  getConditionIcon, 
  type NotebookCondition 
} from '../../types/notebook'

const props = defineProps<{
  condition?: NotebookCondition | string
  active?: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const formattedLabel = computed(() => {
  if (!props.condition) return 'Não informada'
  const text = String(props.condition).trim()
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
})

const variant = computed(() => getConditionVariant(props.condition))
const icon = computed(() => getConditionIcon(props.condition))

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>

<template>
  <FilterPill 
    :label="formattedLabel"
    :icon="icon"
    :variant="variant"
    :active="active"
    :disabled="disabled"
    @click="handleClick"
  />
</template>
