<template>
  <base-error>
    <v-alert type="warning" title="Not Logged In">
      You should log in via HPCGame Platform to use HPConsole.
    </v-alert>
  </base-error>
</template>

<script setup lang="ts">
import BaseError from './BaseError.vue'
</script>
