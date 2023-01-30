<template>
  <VApp>
    <AppBar @navIconClick="nav = !nav" />
    <AppNav v-model="nav" />
    <VMain>
      <NotLoggedInError v-if="!isLoggedIn" />
      <div
        v-else-if="!user.name"
        class="w-full h-full flex justify-center items-center"
      >
        <VProgressCircular indeterminate />
      </div>
      <RouterView v-else />
    </VMain>
  </VApp>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { isLoggedIn, token, user } from '@/utils/storage'
import AppNav from '@/components/app/AppNav.vue'
import AppBar from '@/components/app/AppBar.vue'
import NotLoggedInError from '@/components/errors/NotLoggedInError.vue'
import { ref } from 'vue'
import { getUser } from './utils/api'

const nav = ref<boolean>()

const router = useRouter()

const search = new URLSearchParams(window.location.search)
const tokenName = search.get('tokenName')
const tokenSecret = search.get('tokenSecret')
if (tokenName && tokenSecret) {
  token.value.tokenName = tokenName as string
  token.value.tokenSecret = tokenSecret as string
  router.replace({ path: '/' })
}

getUser(undefined).then((res) => {
  user.value = res
})
</script>
