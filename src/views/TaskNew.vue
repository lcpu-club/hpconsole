<template>
  <VContainer>
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardTitle>Create Task</VCardTitle>
          <VDivider />
          <VCardText>
            <VSelect
              label="Instance Type"
              v-model="instanceType"
              :items="instanceTypes.map((itype) => itype.name)"
            />
            <VTextField label="Task Name" v-model="taskName" />
          </VCardText>
          <VCardActions>
            <VBtn
              color="primary"
              block
              variant="flat"
              @click.stop="create"
              :loading="loading"
            >
              Create
            </VBtn>
          </VCardActions>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script lang="ts" setup>
import { createTask, getInstanceTypes, IInstanceType } from '@/utils/api'
import { toast } from '@/utils/toast'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const instanceType = ref('')
const taskName = ref('')
const router = useRouter()

const instanceTypes = ref<IInstanceType[]>([])
getInstanceTypes(undefined).then((res) => {
  instanceTypes.value = res
})

const loading = ref(false)
function create() {
  loading.value = true
  createTask({
    name: taskName.value,
    ['instance-type']: instanceType.value
  })
    .then(() => {
      toast.success({
        title: 'Task created',
        message: 'Task created successfully'
      })
      router.replace('/')
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      loading.value = false
    })
}
</script>
