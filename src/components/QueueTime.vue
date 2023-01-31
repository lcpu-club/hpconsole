<template>
  <span class="text-caption">
    Estimated queue time:
    <b>{{ duration }}</b>
  </span>
</template>

<script setup lang="ts">
import { getInstanceTypeQueueTime } from '@/utils/api'
import { ref } from 'vue'

const props = defineProps<{
  instanceType: string
  queueTime: string
}>()

const duration = ref('')
getInstanceTypeQueueTime(props.instanceType, props.queueTime).then((res) => {
  duration.value = res.duration
})
</script>
