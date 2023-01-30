<template>
  <VContainer>
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardTitle>Instance Types</VCardTitle>
          <VList>
            <VListItem
              v-for="itype of instanceTypes"
              :key="itype.name"
              :title="itype.name"
              :subtitle="itype.description"
              :value="itype.name"
            >
              <template v-slot:append>
                <div class="text-caption">
                  {{
                    Object.entries(itype.price)
                      .map(([key, val]) => `${val}${key}`)
                      .join()
                  }}
                </div>
              </template>
            </VListItem>
          </VList>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script lang="ts" setup>
import { getInstanceTypes, IInstanceType } from '@/utils/api'
import { ref } from 'vue'

const instanceTypes = ref<IInstanceType[]>([])
getInstanceTypes(undefined).then((res) => {
  instanceTypes.value = res
})
</script>
