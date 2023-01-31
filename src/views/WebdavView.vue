<template>
  <VContainer>
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardTitle>WebDAV</VCardTitle>
          <VDivider />
          <VCardText>
            <VTextField v-model="url" label="URL" readonly />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  connect: string
}>()
const url = computed(() => atob(props.connect))
</script>
