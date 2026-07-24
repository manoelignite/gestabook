<template>
  <div class="login-page-container">
    <div class="m3-card m3-card--elevated login-card">
      <div class="m3-card__content">
        <div v-if="!authStore.user">
          <h1 class="m3-card__title">Entrar no sistema</h1>
          <p class="m3-card__description">Acesse o Gestabook usando sua conta Google institucional.</p>
          <button class="m3-btn m3-btn--filled m3-btn--has-icon" @click="handleLogin">
            <span class="material-symbols" style="--md-sym-opsz: 18">login</span>
            <span>Continuar com Google</span>
          </button>
        </div>

        <div v-else>
          <h1 class="m3-card__title">Boas-vindas</h1>
          <h2 style="font: var(--md-sys-typescale-title-large); color: var(--md-sys-color-primary); margin-bottom: 8px;">
            {{ authStore.user?.displayName }}
          </h2>
          <p class="m3-card__description" style="margin-bottom: 16px;">E-mail: {{ authStore.user?.email }}</p>
          
          <!-- Retornos visuais baseados na Role identificada -->
          <div v-if="authStore.role === 'user'" style="margin-bottom: 24px;">
            <p style="color: var(--md-sys-color-primary);"><strong>Status:</strong> Você está logado como Usuário Comum.</p>
          </div>

          <div v-if="authStore.role === 'denied'" style="margin-bottom: 24px;">
            <p style="color: var(--md-sys-color-error);"><strong>Acesso Negado:</strong> Seu e-mail não está na whitelist.</p>
          </div>

          <button class="m3-btn m3-btn--tonal m3-btn--has-icon" @click="handleLogout">
            <span class="material-symbols" style="--md-sym-opsz: 18">logout</span>
            <span>Sair da conta</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const router = useRouter()

const handleLogin = async () => {
  const userRole = await authStore.loginWithGoogle();

  if (userRole == 'admin') {
    router.push('/admin');
  } else if (userRole === 'user') {
    router.push('/dashboard');
  }
}

const handleLogout = async () => {
  await authStore.logout();
}
</script>

<style scoped>
.login-page-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  padding: 48px 24px;
}
.login-card {
  width: 100%;
  max-width: 420px;
  text-align: center;
}
.m3-card__content {
  align-items: center;
}
.m3-btn {
  width: 100%;
  margin-top: 16px;
}
</style>
