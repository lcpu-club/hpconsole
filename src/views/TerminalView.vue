<template>
  <VContainer class="h-full flex">
    <VRow align="stretch" class="self-stretch">
      <VCol cols="12">
        <VCard class="h-full d-flex flex-col items-stretch">
          <div>
            <VCardTitle>Terminal</VCardTitle>
            <VDivider />
          </div>
          <div class="flex-1 grid place-items-stretch">
            <div
              ref="terminal"
              class="w-full min-h-64"
              v-resize="onResize"
            ></div>
          </div>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { SearchAddon } from 'xterm-addon-search'
import { WebLinksAddon } from 'xterm-addon-web-links'
import { AttachAddon } from 'xterm-addon-attach'
import 'xterm/css/xterm.css'

const props = defineProps<{
  connect: string
}>()
const url = computed(() => atob(props.connect))
const terminal = ref<HTMLDivElement>(null as never)

const term = new Terminal()
const fitAddon = new FitAddon()
const searchAddon = new SearchAddon()
const webLinksAddon = new WebLinksAddon()
term.loadAddon(fitAddon)
term.loadAddon(searchAddon)
term.loadAddon(webLinksAddon)

onMounted(() => {
  term.open(terminal.value)
  fitAddon.fit()
  term.writeln('Connecting to ' + url.value)
  const urlInst = new URL(url.value)
  urlInst.searchParams.set('height', String(term.rows))
  urlInst.searchParams.set('width', String(term.cols))
  const socket = new WebSocket(urlInst.toString())
  const attachAddon = new AttachAddon(socket)
  term.loadAddon(attachAddon)
  socket.addEventListener('close', () => {
    term.writeln('Connection closed.')
  })
  socket.addEventListener('error', () => {
    term.writeln('Connection error.')
  })
})

function onResize() {
  fitAddon.fit()
}
</script>
