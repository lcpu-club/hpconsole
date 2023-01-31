<template>
  <VContainer>
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardTitle>My Info</VCardTitle>
          <VDivider />
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
          <div class="pr-4 flex justify-between items-center">
            <VCardTitle>My Tasks</VCardTitle>
            <div>
              <VBtn color="primary" to="/task/new">Create</VBtn>
            </div>
          </div>
          <VDivider />
          <VList>
            <VListItem
              v-for="task in tasks"
              :key="task.name"
              :title="task.name"
              :value="task.name"
              :to="`/task/view/${encodeURIComponent(task.name)}`"
            >
              <template v-slot:append>
                <div
                  class="grid grid-cols-1 grid-flow-row text-right justify-items-end"
                >
                  <div class="flex items-center gap-2">
                    <VChip size="small" :ripple="false" label>
                      {{ task.status }}
                    </VChip>
                    <VChip
                      label
                      :ripple="false"
                      size="small"
                      variant="outlined"
                    >
                      {{ task['instance-type'] }}
                    </VChip>
                  </div>
                  <TaskQueueTime
                    v-if="task.status === 'queued'"
                    :instance-type="task['instance-type']"
                    :queue-time="task['queue-time']"
                  />
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
import { ITask } from '@/utils/api'
import { user } from '@/utils/storage'
import { ref } from 'vue'
import { getTasks } from '@/utils/api'
import TaskQueueTime from '@/components/QueueTime.vue'

const tasks = ref<ITask[]>([])
getTasks(undefined).then((res) => {
  tasks.value = res
})
</script>
