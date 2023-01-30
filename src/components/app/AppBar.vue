<template>
  <VAppBar>
    <VAppBarNavIcon variant="text" @click.stop="emits('navIconClick')" />
    <VToolbarTitle>HPConsole</VToolbarTitle>
    <VSpacer />
    <VBtn v-if="isLoggedIn" variant="flat" color="info" @click="logout">
      Logout
    </VBtn>
  </VAppBar>
</template>

<script setup lang="ts">
import { isLoggedIn, logout } from '@/utils/storage'

const emits = defineEmits<{
  (ev: 'navIconClick'): void
}>()
</script>
