<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const isOpen = ref(false)
const menuRef = ref<HTMLElement | null>(null)

const user = computed(() => authStore.user)
const userPhoto = computed(() => user.value?.photoURL)
const userEmail = computed(() => user.value?.email || '')

// Retorna apenas o primeiro e o último nome do usuário
const userFirstAndLastName = computed(() => {
  if (!user.value?.displayName) {
    return user.value?.email || 'Usuário'
  }
  const parts = user.value.displayName.trim().split(/\s+/).filter(Boolean)
  if (parts.length <= 1) {
    return parts[0] || 'Usuário'
  }
  return `${parts[0]} ${parts[parts.length - 1]}`
})

const initial = computed(() => {
  if (user.value?.displayName) {
    return user.value.displayName.trim().charAt(0).toUpperCase()
  }
  if (user.value?.email) {
    return user.value.email.trim().charAt(0).toUpperCase()
  }
  return 'U'
})

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = (event: MouseEvent) => {
  if (menuRef.value && !menuRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

const handleLogout = async () => {
  isOpen.value = false
  await authStore.logout()
  router.push('/')
}

onMounted(() => {
  window.addEventListener('click', closeMenu)
})

onUnmounted(() => {
  window.removeEventListener('click', closeMenu)
})
</script>

<template>
  <div class="user-avatar-container wco-no-drag" ref="menuRef">
    <button 
      class="avatar-btn" 
      @click="toggleMenu" 
      :aria-expanded="isOpen"
      aria-haspopup="true"
      aria-label="Menu do Usuário"
    >
      <img 
        v-if="userPhoto" 
        :src="userPhoto" 
        :alt="userFirstAndLastName" 
        class="avatar-img" 
        referrerpolicy="no-referrer"
      />
      <div v-else class="avatar-fallback">
        <span>{{ initial }}</span>
      </div>
    </button>

    <transition name="menu-fade">
      <div v-if="isOpen" class="dropdown-menu">
        <!-- 1. Header: Primeiro + Último nome e E-mail -->
        <div class="dropdown-header">
          <p class="user-name">{{ userFirstAndLastName }}</p>
          <p v-if="userEmail" class="user-email">{{ userEmail }}</p>
        </div>

        <div class="menu-divider"></div>

        <!-- 2. Menu (Reservado para futuros itens de navegação/ações) -->
        <!-- Omitido temporariamente por estar vazio -->

        <!-- 3. Footer: Botão de Sair -->
        <div class="dropdown-footer">
          <button 
            class="logout-btn m3-btn m3-btn--tonal m3-btn--has-icon" 
            @click="handleLogout"
          >
            <span class="material-symbols" style="--md-sym-opsz: 18">logout</span>
            <span>Sair</span>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.user-avatar-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-app-region: no-drag;
}

.avatar-btn {
  -webkit-app-region: no-drag;
  position: relative;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 2px solid var(--md-sys-color-outline-variant, #CAC4D0);
  padding: 0;
  margin: 0;
  background-color: var(--md-sys-color-surface-container-high, #ECE6F0);
  cursor: pointer;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.avatar-btn:hover {
  border-color: var(--md-sys-color-primary, #6750A4);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--md-sys-color-primary, #6750A4) 20%, transparent);
}

.avatar-btn:focus-visible {
  border-color: var(--md-sys-color-primary, #6750A4);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--md-sys-color-primary, #6750A4) 40%, transparent);
}

.avatar-btn:active {
  transform: scale(0.95);
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  display: block;
}

.avatar-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--md-sys-color-primary-container, #EADDFF);
  color: var(--md-sys-color-on-primary-container, #21005D);
  font-family: var(--md-sys-typescale-font-sans, sans-serif);
  font-weight: 600;
  font-size: 16px;
  user-select: none;
}

.dropdown-menu {
  -webkit-app-region: no-drag;
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 220px;
  background-color: var(--md-sys-color-surface-container-low, #F7F2FA);
  border: 1px solid var(--md-sys-color-outline-variant, #CAC4D0);
  border-radius: var(--md-sys-shape-medium, 12px);
  box-shadow: var(--md-sys-elevation-3, 0px 4px 8px 3px rgba(0, 0, 0, 0.15));
  padding: 12px;
  z-index: 1001;
  transform-origin: top right;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dropdown-header {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 2px 4px;
}

.user-name {
  margin: 0;
  font-family: var(--md-sys-typescale-font-sans, sans-serif);
  font-size: 14px;
  font-weight: 700;
  color: var(--md-sys-color-on-surface, #1D1B20);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-email {
  margin: 0;
  font-family: var(--md-sys-typescale-font-sans, sans-serif);
  font-size: 12px;
  color: var(--md-sys-color-on-surface-variant, #49454F);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.menu-divider {
  height: 1px;
  background-color: var(--md-sys-color-outline-variant, #CAC4D0);
  margin: 2px 0;
}

.dropdown-footer {
  display: flex;
  width: 100%;
}

.logout-btn {
  width: 100%;
  justify-content: center;
  background-color: var(--md-sys-color-error, #B3261E);
  color: var(--md-sys-color-on-error, #FFFFFF);
  border: none;
  height: 38px;
  font-size: 13px;
  font-weight: 600;
  border-radius: var(--md-sys-shape-small, 8px);
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: background-color 0.2s ease, box-shadow 0.2s ease, transform 0.1s ease;
}

.logout-btn:hover {
  background-color: #901D17;
  box-shadow: 0 2px 6px rgba(179, 38, 30, 0.4);
}

.logout-btn:active {
  transform: scale(0.98);
}

/* Animations */
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
