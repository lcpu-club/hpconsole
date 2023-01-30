<template>
  <VCol cols="12" v-if="instance">
    <VCard>
      <VCardTitle>Instance Info</VCardTitle>
      <VDivider />
      <VList density="compact">
        <VListItem
          v-for="[key, val] in Object.entries(instance)"
          :key="key"
          :title="val"
          :subtitle="key"
          :value="key"
        />
      </VList>
      <VDivider />
      <VCardActions>
        <VBtn variant="flat" color="success" @click="command('start')">
          Start
        </VBtn>
        <VBtn variant="flat" color="error" @click="command('stop')">
          Stop
        </VBtn>
        <VBtn variant="flat" color="warning" @click="command('restart')">
          Restart
        </VBtn>
        <VBtn variant="outlined" @click="spice">SPICE</VBtn>
        <VBtn variant="outlined" @click="shell">Shell</VBtn>
        <VBtn variant="outlined">
          Exec
          <VDialog v-model="execDialog" activator="parent" max-width="256">
            <VCard>
              <VCardText>
                <VTextField v-model="execCmd" label="Command" />
              </VCardText>
              <VCardActions>
                <VBtn color="primary" block @click="exec">Execute</VBtn>
              </VCardActions>
            </VCard>
          </VDialog>
        </VBtn>
      </VCardActions>
    </VCard>
  </VCol>
</template>

<script setup lang="ts">
import {
  getInstanceState,
  IInstanceState,
  updateInstanceState
} from '@/utils/api'
import { token } from '@/utils/storage'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  instanceName: string
}>()

const instance = ref<IInstanceState>(null as never)
function load() {
  getInstanceState(props.instanceName).then((res) => {
    instance.value = res
  })
}
load()

function command(action: string) {
  return updateInstanceState(props.instanceName, action, false, false).then(
    load
  )
}

const wsBase = import.meta.env.VITE_VMSCHED_WS
const router = useRouter()

function spice() {
  const url =
    import.meta.env.VITE_SPICE_URL +
    '?path=' +
    encodeURIComponent(
      wsBase +
        '/spice?' +
        new URLSearchParams({
          instance: props.instanceName,
          token_name: token.value.tokenName,
          token_secret: token.value.tokenSecret
        })
    )
  window.open(url, '_blank')
}

function shell() {
  const url =
    wsBase +
    '/console?' +
    new URLSearchParams({
      instance: props.instanceName,
      token_name: token.value.tokenName,
      token_secret: token.value.tokenSecret
    })
  window.open(router.resolve(`/terminal?connect=${btoa(url)}`).href, '_blank')
}

const execDialog = ref(false)
const execCmd = ref('')

function exec() {
  const url =
    wsBase +
    '/exec?' +
    new URLSearchParams({
      instance: props.instanceName,
      token_name: token.value.tokenName,
      token_secret: token.value.tokenSecret,
      cmd: execCmd.value
    })
  window.open(router.resolve(`/terminal?connect=${btoa(url)}`).href, '_blank')
}
</script>
