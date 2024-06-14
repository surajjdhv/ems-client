import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface userCredentials {
  user: string
  token: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<string | null>(null)
  const token = ref<string | null>(null)

  function login(userCredentials: userCredentials) {
    user.value = userCredentials.user
    token.value = userCredentials.token
  }

  function logout() {
    user.value = null
    token.value = null
  }

  const isAuthenticated = computed(() => !!token.value)

  return { user, token, login, logout, isAuthenticated }
})
