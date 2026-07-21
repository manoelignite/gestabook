<template>
  <div v-if="!authStore.user">
    <h1>Entrar no sistema</h1>
    <button @click="handleLogin">Continuar com Google</button>
  </div>

  <div v-else>
    <h1>Boas-vindas, {{ authStore.user?.displayName }}</h1>
    <p>E-mail: {{ authStore.user?.email }}</p>
    
    <!-- Retornos visuais baseados na Role identificada -->
    <div v-if="authStore.role === 'user'">
      <p><strong>Status:</strong> Você está logado como Usuário Comum.</p>
    </div>

    <div v-if="authStore.role === 'denied'">
      <p style="color: red;"><strong>Acesso Negado:</strong> Seu e-mail não está na whitelist.</p>
    </div>

    <button @click="handleLogout">Sair da conta</button>
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
