import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useCookies } from '@vueuse/integrations/useCookies'

interface userCredentials {
  user: string
  token: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<string | null>(null)
  const token = ref<string | null>(null)
  const cookies = useCookies(['accessToken'])

  function login(userCredentials: userCredentials) {
    user.value = userCredentials.user
    token.value = userCredentials.token

    cookies.set('accessToken', userCredentials.token)
  }

  function logout() {
    user.value = null
    token.value = null
    cookies.remove('accessToken')
  }

  const isAuthenticated = computed(() => !!token.value || !!cookies.get('accessToken'))

  return { user, token, login, logout, isAuthenticated }
})
