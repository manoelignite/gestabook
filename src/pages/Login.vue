<template>
  <div v-if="!user">
    <h1>Entrar no sistema</h1>
    <button @click="login">Continuar com Google</button>
  </div>

  <div v-else>
    <h1>Boas-vindas, {{ user?.displayName }}</h1>
    <p>E-mail: {{ user?.email }}</p>
    <button @click="logout">Sair da conta</button>
  </div>
</template>

<script setup lang="ts">
import type { User } from 'firebase/auth';

import { ref, onMounted } from 'vue';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

import { auth, googleProvider } from '../config/firebaseConfig';

const user = ref<User | null>(null)

onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser
  })
})

const login = async () => {
  try {
    const resultado = await signInWithPopup(auth, googleProvider)
    user.value = resultado.user
    console.log("Usuário logado com sucesso:", resultado.user)
  } catch (erro) {
    console.error("Falha ao tentar logar:", (erro as Error).message)
  }
}

const logout = async () => {
  try {
    await signOut(auth)
    user.value = null
    console.log("Usuário deslogado.")
  } catch (erro) {
    console.error("Erro ao sair:", (erro as Error).message)
  }
}
</script>