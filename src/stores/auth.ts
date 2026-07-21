import { onAuthStateChanged, signInWithPopup, signOut, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import { ref } from "vue";
import { auth, database, googleProvider } from "../config/firebaseConfig";

export type UserRole = 'admin' | 'user' | 'denied' | null

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const role = ref<UserRole>(null)
  const isLoading = ref(true)

  const verifyRole = async (email: string): Promise<UserRole> => {
    try {
      const docRef = doc(database, 'whitelist', email)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const foundRole = docSnap.data().role as UserRole
        role.value = foundRole
        return foundRole
      } 
      else {
        role.value = 'denied'
        return 'denied'
      }
    } catch (error) {
      console.error("Erro ao verificar role: ", error)
      role.value = 'denied'
      return 'denied'
    }
  }

  const hasPermission = (requiredRole: UserRole) => {
    if (!user.value) return false

    return role.value === requiredRole
  }

  const loginWithGoogle = async (): Promise<UserRole | undefined> => {
    try {
      const response = await signInWithPopup(auth, googleProvider)
      user.value = response.user

      if (response.user.email) {
        return await verifyRole(response.user.email)
      }
    } catch (error) {
      console.error('Falha ao tentar logar: ', (error as Error).message)
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      user.value = null
      role.value = null
    } catch (error) {
      console.error("Error ao sair:", (error as Error).message)
    }
  }

  const initAuth = () => {
    return new Promise<void>((resolve) => {
      onAuthStateChanged(auth, async (currentUser) => {
        user.value = currentUser

        if (currentUser?.email) {
          await verifyRole(currentUser.email)
        } else {
          user.value = null
          role.value = null
        }

        isLoading.value = false
        resolve()
      })
    })
  }

  return {
    user,
    role,
    isLoading,
    verifyRole,
    hasPermission,
    loginWithGoogle,
    logout,
    initAuth
  }
})