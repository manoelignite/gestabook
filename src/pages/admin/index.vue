<template>
  <div>
    <h1>Cadastrar Novo Usuário na Whitelist</h1>
    
    <input 
      v-model="emailInput" 
      type="email" 
      placeholder="usuario@prof.educacao.sp.gov.br" 
    />
    
    <button @click="cadastrarUsuario">Salvar</button>
    
    <p v-if="mensagem">{{ mensagem }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { database } from '../../config/firebaseConfig' // Altere para o caminho do seu arquivo de config do Firebase
import { doc, setDoc } from 'firebase/firestore'

const emailInput = ref('')
const mensagem = ref('')

const cadastrarUsuario = async () => {
  // Limpa mensagem anterior
  mensagem.value = ''
  
  // Define o ID do documento exatamente como o email digitado
  const docRef = doc(database, 'whitelist', emailInput.value)
  
  // Grava o documento forçando a role como "user"
  await setDoc(docRef, {
    role: 'user'
  })
  
  mensagem.value = 'Usuário cadastrado com sucesso!'
  emailInput.value = ''
}
</script>
