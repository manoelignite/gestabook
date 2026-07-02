<template>
  <div v-if="!user">
    <h1>Entrar no sistema</h1>
    <button @click="login">Continuar com Google</button>
  </div>

  <div v-else>
    <h1>Boas-vindas, {{ user?.displayName }}</h1>
    <p>E-mail: {{ user?.email }}</p>
    
    <!-- Retornos visuais baseados na Role identificada -->
    <div v-if="role === 'user'">
      <p><strong>Status:</strong> Você está logado como Usuário Comum.</p>
    </div>

    <div v-if="role === 'negado'">
      <p style="color: red;"><strong>Acesso Negado:</strong> Seu e-mail não está na whitelist.</p>
    </div>

    <button @click="logout">Sair da conta</button>
  </div>
</template>

<script setup lang="ts">
import type { User } from 'firebase/auth';

import { ref, onMounted } from 'vue';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'vue-router'; // Importa o direcionador de rotas
import { doc, getDoc } from 'firebase/firestore'; // Importa funções do Firestore

import { auth, googleProvider } from '../config/firebaseConfig';
import { database } from '../config/firebaseConfig'; // Certifique-se de exportar o 'db' (getFirestore) daqui

const user = ref<User | null>(null)
const role = ref<string | null>(null) // Armazena: 'admin', 'user', 'negado' ou null
const router = useRouter()

// Função isolada para checar a role do usuário no Firestore
const verificarRole = async (email: string) => {
  // 1. Verifica se é o seu e-mail admin cadastrado de forma fixa
  if (email === 'sergiogabriel@prof.educacao.sp.gov.br') {
    role.value = 'admin'
    router.push('/admin') // Redireciona imediatamente para a página admin
    return
  }

  // 2. Se não for o admin fixo, consulta a coleção 'whitelist' no Firestore
  const docRef = doc(database, 'whitelist', email)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists() && docSnap.data().role === 'user') {
    role.value = 'user'
  } else {
    role.value = 'negado'
  }
}

onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser
    if (currentUser?.email) {
      verificarRole(currentUser.email)
    } else {
      role.value = null
    }
  })
})

const login = async () => {
  try {
    const resultado = await signInWithPopup(auth, googleProvider)
    user.value = resultado.user
    if (resultado.user.email) {
      await verificarRole(resultado.user.email)
    }
  } catch (erro) {
    console.error("Falha ao tentar logar:", (erro as Error).message)
  }
}

const logout = async () => {
  try {
    await signOut(auth)
    user.value = null
    role.value = null
    console.log("Usuário deslogado.")
  } catch (erro) {
    console.error("Erro ao sair:", (erro as Error).message)
  }
}
</script>
