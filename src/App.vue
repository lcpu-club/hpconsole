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
import { useRoute, useRouter } from 'vue-router'
import { isLoggedIn, token, user } from '@/utils/storage'
import AppNav from '@/components/app/AppNav.vue'
import AppBar from '@/components/app/AppBar.vue'
import NotLoggedInError from '@/components/errors/NotLoggedInError.vue'
import { ref } from 'vue'
import { getUser } from './utils/api'

const nav = ref<boolean>()

const route = useRoute()
const router = useRouter()
if (route.query.tokenName && route.query.tokenSecret) {
  token.value.tokenName = route.query.tokenName as string
  token.value.tokenSecret = route.query.tokenSecret as string
  router.replace({ path: '/' })
}

getUser(undefined).then((res) => {
  user.value = res
})
</script>
