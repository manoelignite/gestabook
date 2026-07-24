<template>
  <div class="form-page-container">
    <h2 class="form-title">Cadastrar Novo Usuário na Whitelist</h2>
    
    <form @submit.prevent="cadastrarUsuario">
      <div>
        <label for="whitelistEmail">E-mail do Usuário</label>
        <input 
          id="whitelistEmail"
          v-model="emailInput" 
          type="email" 
          placeholder="usuario@prof.educacao.sp.gov.br" 
          required
        />
      </div>
      
      <button class="m3-btn m3-btn--filled" type="submit">
        <span class="material-symbols" style="--md-sym-opsz: 18">save</span>
        <span>Salvar na Whitelist</span>
      </button>
      
      <p v-if="mensagem" class="mensagem-status">{{ mensagem }}</p>
    </form>

    <div class="navigation-links">
      <button class="m3-btn m3-btn--tonal" @click="router.push('/dashboard')">
        <span>Voltar ao Dashboard</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { database } from '../../config/firebaseConfig'
import { doc, setDoc } from 'firebase/firestore'

const router = useRouter()
const emailInput = ref('')
const mensagem = ref('')

const cadastrarUsuario = async () => {
  mensagem.value = ''
  
  if (!emailInput.value) return;

  const docRef = doc(database, 'whitelist', emailInput.value)
  
  try {
    await setDoc(docRef, {
      role: 'user'
    })
    mensagem.value = 'Usuário cadastrado com sucesso!'
    emailInput.value = ''
  } catch (error) {
    mensagem.value = 'Erro ao cadastrar usuário.'
  }
}
</script>

<style scoped>
.form-page-container {
  padding: 48px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  flex-grow: 1;
}

.form-title {
  font: var(--md-sys-typescale-headline-medium);
  color: var(--md-sys-color-on-surface);
  text-align: center;
}

.m3-btn {
  margin-top: 12px;
  width: 100%;
}

.mensagem-status {
  font: var(--md-sys-typescale-body-medium);
  color: var(--md-sys-color-primary);
  text-align: center;
  margin-top: 8px;
}

.navigation-links {
  margin-top: 16px;
  width: 100%;
  max-width: 480px;
}
</style>
