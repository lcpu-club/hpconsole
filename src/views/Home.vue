<template>
  <VContainer>
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardTitle>My Info</VCardTitle>
          <VCardText>
            Welcome, <b>{{ user.name }}</b>
            <br />
            Your role is <b>{{ user.role }}</b>
            <br />
            Balance:
            <pre class="whitespace-pre">{{
              Object.entries(user.balance)
                .map(([type, val]) => `${type}: ${val}`)
                .join('\n')
            }}</pre>
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12">
        <VCard>
          <VCardTitle>My Tasks</VCardTitle>
          <VCardText>
            <!-- cluster info -->
            Cluster info
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script lang="ts" setup>
import { user } from '@/utils/storage'
</script>
