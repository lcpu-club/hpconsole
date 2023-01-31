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
              <VDialog v-model="dialog" activator="parent" max-width="480">
                <VCard title="Start Instance">
                  <VCardText>
                    <VTextField v-model="lifeTime" label="Life time" />
                    <code><b>Price&nbsp;</b>{{ price }}</code>
                    <br />
                    <code><b>Cost&nbsp;&nbsp;</b>{{ price }}</code>
                  </VCardText>
                  <VCardActions>
                    <VBtn color="primary" block variant="flat" @click="start">
                      Start
                    </VBtn>
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
        :instance-type="task['instance-type']"
      />
    </VRow>
  </VContainer>
</template>

<script lang="ts" setup>
import InstanceInfo from '@/components/InstanceInfo.vue'
import {
  getInstanceType,
  getTask,
  IInstanceType,
  ITask,
  updateTaskState
} from '@/utils/api'
import { computed, ref } from 'vue'

const props = defineProps<{
  taskName: string
}>()

const dialog = ref(false)
const lifeTime = ref('1h')

const task = ref<ITask>(null as never)
const instanceType = ref<IInstanceType>(null as never)
const price = computed(() =>
  Object.entries(instanceType.value?.price ?? {})
    .map(([key, val]) => `${val}@${key}`)
    .join()
)
async function load() {
  const res = await getTask(props.taskName)
  task.value = res
  instanceType.value = await getInstanceType(res['instance-type'])
}
load()

function start() {
  updateTaskState(props.taskName, lifeTime.value, 'active').then(load)
}
</script>
