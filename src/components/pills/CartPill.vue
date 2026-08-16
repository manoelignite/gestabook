<script setup lang="ts">
import FilterPill from './FilterPill.vue'

defineProps<{
  cart: string
  active?: boolean
  disabled?: boolean
  title?: string
}>()

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>

<template>
  <FilterPill 
    :label="cart"
    icon="charger"
    :active="active"
    :disabled="disabled"
    :title="title"
    @click="handleClick"
  />
</template>
