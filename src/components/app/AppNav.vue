<template>
  <VNavigationDrawer>
    <VList nav>
      <VListItem v-for="(item, i) in nav" :key="i" v-bind="item" />
    </VList>
  </VNavigationDrawer>
</template>

<script setup lang="ts">
const nav = [
  { prependIcon: 'mdi-home', title: 'Home', value: 'home', to: '/' },
  {
    prependIcon: 'mdi-server',
    title: 'Instance Types',
    value: 'instance',
    to: '/instance-types'
  }
]
</script>
