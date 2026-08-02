<template>
  <div class="dashboard-container">
    <h1 class="dashboard-title">Painel de Controle</h1>
    
    <div class="cards-grid">
      <!-- Card Cadastrar -->
      <div class="m3-card m3-card--elevated m3-card--interactive" tabindex="0" @click="router.push('/equipment/new')">
        <div class="m3-card__content">
          <div class="card-header-icon">
            <span class="material-symbols" style="--md-sym-opsz: 32">add_circle</span>
          </div>
          <h2 class="m3-card__title">Cadastrar Equipamento</h2>
          <p class="m3-card__description">
            Registre novos notebooks, desktops, chromebooks, tablets ou TVs no inventário do sistema.
          </p>
          <div class="m3-card__actions">
            <button class="m3-btn m3-btn--filled">Cadastrar</button>
          </div>
        </div>
      </div>

      <!-- Card Listar -->
      <div class="m3-card m3-card--elevated m3-card--interactive" tabindex="0" @click="router.push('/equipment/list')">
        <div class="m3-card__content">
          <div class="card-header-icon">
            <span class="material-symbols" style="--md-sym-opsz: 32">devices</span>
          </div>
          <h2 class="m3-card__title">Listar Equipamentos</h2>
          <p class="m3-card__description">
            Visualize, busque e gerencie todos os equipamentos de TI com seus respectivos números de série.
          </p>
          <div class="m3-card__actions">
            <button class="m3-btn m3-btn--filled">Visualizar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style scoped>
.dashboard-container {
  padding: 48px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

.dashboard-title {
  font: var(--md-sys-typescale-headline-large);
  color: var(--md-sys-color-on-surface);
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  width: 100%;
  max-width: 720px;
}

.card-header-icon {
  color: var(--md-sys-color-primary);
  margin-bottom: 12px;
  display: flex;
  justify-content: flex-start;
}

.m3-card {
  text-align: left;
}
</style>