import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'
import { IUser } from './api'

export const token = useLocalStorage(
  'token',
  {
    tokenName: '',
    tokenSecret: ''
  },
  { deep: true }
)
export const isLoggedIn = computed(() => !!token.value.tokenSecret)

export const user = useLocalStorage<IUser>('user', {
  balance: {},
  name: '',
  role: ''
})

export function logout() {
  token.value.tokenName = ''
  token.value.tokenSecret = ''
  user.value.name = ''
}
