<script setup lang="ts">
import { computed } from 'vue'
import FilterPill from './FilterPill.vue'

const props = defineProps<{
  maintenance: boolean
  active?: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const label = computed(() => props.maintenance ? 'Em Manutenção' : 'Operacional')
const icon = computed(() => props.maintenance ? 'build' : 'check_circle')
const variant = computed(() => props.maintenance ? 'red' : 'green')

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>

<template>
  <FilterPill 
    :label="label"
    :icon="icon"
    :variant="variant"
    :active="active"
    :disabled="disabled"
    @click="handleClick"
  />
</template>
