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
          <VCardActions>
            <VBtn
              variant="flat"
              color="success"
              :disabled="task.status !== 'inactive'"
            >
              Start
              <VDialog v-model="dialog" activator="parent" max-width="480">
                <VCard title="Start Instance">
                  <VCardText>
                    <VTextField v-model="lifeTime" label="Life time" />
                    <code><b>Price&nbsp;</b>{{ price }}</code>
                    <br />
                    <code><b>Cost&nbsp;&nbsp;</b>{{ cost }}</code>
                  </VCardText>
                  <VCardActions>
                    <VBtn
                      color="primary"
                      block
                      variant="flat"
                      @click="start"
                      :loading="starting"
                    >
                      Start
                    </VBtn>
                  </VCardActions>
                </VCard>
              </VDialog>
            </VBtn>
            <VBtn color="error" variant="flat" @click="del"> Delete </VBtn>
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
  updateTaskState,
  deleteTask
} from '@/utils/api'
import { toast } from '@/utils/toast'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import parse from 'parse-duration'

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
const cost = computed(() => {
  const min = parse(lifeTime.value, 'm')
  return Object.entries(instanceType.value?.price ?? {})
    .map(([key, val]) => `${Number((val * min).toFixed(4))}@${key}`)
    .join()
})
async function load() {
  const res = await getTask(props.taskName)
  task.value = res
  instanceType.value = await getInstanceType(res['instance-type'])
}
load()

const starting = ref(false)
function start() {
  starting.value = true
  updateTaskState(props.taskName, lifeTime.value, 'active')
    .then(load)
    .finally(() => {
      starting.value = false
      dialog.value = false
    })
}

const router = useRouter()

function del() {
  deleteTask(props.taskName).then(() => {
    toast.info({
      title: 'Success',
      message: 'Task deleted'
    })
    router.replace('/')
  })
}
</script>
