import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useCookies } from '@vueuse/integrations/useCookies'
import { useRouter } from 'vue-router'

import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

const API_URL = `${import.meta.env.VITE_API_URL}`

export const useAuthStore = defineStore('auth', () => {
  const authErrorMessage = ref<string | null>(null)
  const token = ref<string | null>(null)

  const cookies = useCookies(['accessToken'])
  const router = useRouter()

  async function login(userCredentials: userCredentials) {
    try {
      await axios.get(`${API_URL}/sanctum/csrf-cookie`)
      if (cookies.get('XSRF-TOKEN')) {
        const { data: loginResponse } = await axios.post(`${API_URL}/user/login`, {
          email: userCredentials.user,
          password: userCredentials.password
        })

        if (loginResponse.data.access_token) {
          authErrorMessage.value = ''

          token.value = loginResponse.data.access_token

          cookies.set('accessToken', token.value)

          axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`

          await fetchUserDetails()

          router.replace('/')
        }
      } else {
        console.error('Unable to set csrf-cookie')
        authErrorMessage.value = 'Unable to sign in'
      }
    } catch (error: any) {
      authErrorMessage.value = error.response.data.message
    }
  }

  async function fetchUserDetails() {
    try {
      const { data: userDetailsResponse } = await axios.get(`${API_URL}/user/me`)
      console.log(`Welcome, ${userDetailsResponse.data.name}`)
    } catch (error) {
      console.error('Unable to fetch user details', error)
    }
  }

  async function logout() {
    token.value = null
    cookies.remove('accessToken')
    router.replace('/login')
  }

  const isAuthenticated = computed(() => !!token.value || !!cookies.get('accessToken'))

  return { login, logout, token, authErrorMessage, isAuthenticated }
})

interface userCredentials {
  user: string
  password: string
}
