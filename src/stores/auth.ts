import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useCookies } from '@vueuse/integrations/useCookies'
import { useRouter } from 'vue-router'

import axios from 'axios'

const API_URL = `${import.meta.env.VITE_API_URL}`

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)

  const cookies = useCookies(['accessToken'])
  const router = useRouter()

  async function login(userCredentials: userCredentials) {
    try {
      const loginResponse = await axios.post(`${API_URL}/user/login`, {
        email: userCredentials.user,
        password: userCredentials.password
      })

      if (loginResponse.data.status === 'success') {
        token.value = loginResponse.data.access_token
        cookies.set('accessToken', token.value)
        router.replace('/')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  async function logout() {
    token.value = null
    cookies.remove('accessToken')
    router.replace('/login')
  }

  const isAuthenticated = computed(() => !!token.value || !!cookies.get('accessToken'))

  return { token, login, logout, isAuthenticated }
})

interface userCredentials {
  user: string
  password: string
}
