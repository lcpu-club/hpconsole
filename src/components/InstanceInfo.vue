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
        <div class="flex simplify-checkbox">
          <VCheckbox v-model="force" density="compact" label="Force" />
          <VCheckbox v-model="stateful" density="compact" label="Stateful" />
        </div>
      </VCardActions>
      <VDivider />
      <VCardActions>
        <VBtn
          variant="outlined"
          @click="spice"
          prepend-icon="mdi-remote-desktop"
        >
          SPICE
        </VBtn>
        <VBtn variant="outlined" @click="shell" prepend-icon="mdi-console">
          Shell
        </VBtn>
        <VBtn variant="outlined" prepend-icon="mdi-console">
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
        <VBtn
          variant="outlined"
          @click="webdav"
          prepend-icon="mdi-folder-network-outline"
        >
          WebDAV
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
async function load() {
  instance.value = await getInstanceState(props.instanceName)
}
load()

const force = ref(false)
const stateful = ref(false)
function command(action: string) {
  return updateInstanceState(
    props.instanceName,
    action,
    force.value,
    stateful.value
  ).then(load)
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

const wsPrefix =
  (location.protocol === 'https:' ? 'wss:' : 'ws:') + '//' + location.host

function shell() {
  const url =
    wsPrefix +
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
    wsPrefix +
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

function webdav() {
  const url = new URL(
    import.meta.env.VITE_VMSCHED_WEBDAV +
      '/' +
      encodeURIComponent(props.instanceName) +
      '/'
  )
  url.username = token.value.tokenName
  url.password = token.value.tokenSecret
  window.open(
    router.resolve(`/webdav?connect=${btoa(url.toString())}`).href,
    '_blank'
  )
}
</script>

<style>
.simplify-checkbox .v-input__details {
  display: none;
}
</style>
