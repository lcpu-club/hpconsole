<template>
  <VContainer>
    <VRow v-if="task">
      <VCol cols="12">
        <VCard>
          <VCardTitle>Task Info</VCardTitle>
          <VDivider />
          <VList density="compact">
            <VListItem
              v-for="[key, val] in Object.entries(task)"
              :key="key"
              :title="val"
              :subtitle="key"
              :value="key"
            />
          </VList>
          <VDivider />
          <VCardActions v-if="task.status === 'inactive'">
            <VBtn variant="flat" color="success" block>
              Start
              <VDialog v-model="dialog" activator="parent" max-width="256">
                <VCard>
                  <VCardText>
                    <VTextField v-model="lifeTime" label="Life time" />
                  </VCardText>
                  <VCardActions>
                    <VBtn color="primary" block @click="start">Start</VBtn>
                  </VCardActions>
                </VCard>
              </VDialog>
            </VBtn>
          </VCardActions>
        </VCard>
      </VCol>
      <InstanceInfo
        v-if="task.status === 'active' && task.instance"
        :instance-name="task.instance"
      />
    </VRow>
  </VContainer>
</template>

<script lang="ts" setup>
import InstanceInfo from '@/components/InstanceInfo.vue'
import { getTask, ITask, updateTaskState } from '@/utils/api'
import { ref } from 'vue'

const props = defineProps<{
  taskName: string
}>()

const dialog = ref(false)
const lifeTime = ref('1h')

const task = ref<ITask>(null as never)
function load() {
  return getTask(props.taskName).then((res) => {
    task.value = res
  })
}
load()

function start() {
  updateTaskState(props.taskName, lifeTime.value, 'active').then(load)
}
</script>
