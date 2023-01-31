<template>
  <VContainer>
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardTitle>Instance Types</VCardTitle>
          <VDivider />
          <VList>
            <VListItem
              v-for="itype of instanceTypes"
              :key="itype.name"
              :title="itype.name"
              :subtitle="itype.description"
              :value="itype.name"
            >
              <template v-slot:append>
                <div class="grid grid-cols-1 grid-flow-row text-right">
                  <div class="text-body-2">
                    Estimated queue time: {{ queueInfo[itype.name] }}
                  </div>
                  <div class="text-caption">
                    <code>{{
                      Object.entries(itype.price)
                        .map(([key, val]) => `${val}@${key}`)
                        .join()
                    }}</code>
                  </div>
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
import {
  getInstanceTypeQueueTime,
  getInstanceTypes,
  IInstanceType
} from '@/utils/api'
import { ref } from 'vue'

const instanceTypes = ref<IInstanceType[]>([])
const queueInfo = ref<Record<string, string>>({})
getInstanceTypes(undefined).then(async (res) => {
  instanceTypes.value = res
  for (const itype of res) {
    const { duration } = await getInstanceTypeQueueTime(itype.name)
    queueInfo.value[itype.name] = duration
  }
})
</script>
