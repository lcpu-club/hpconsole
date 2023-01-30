<template>
  <VContainer>
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardTitle>Terminal</VCardTitle>
          <VDivider />
          <div ref="terminal" class="w-full min-h-64" v-resize="onResize"></div>
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

var term = new Terminal()
const fitAddon = new FitAddon()
const searchAddon = new SearchAddon()
const webLinksAddon = new WebLinksAddon()
const attachAddon = new AttachAddon(new WebSocket(url.value))
term.loadAddon(fitAddon)
term.loadAddon(searchAddon)
term.loadAddon(webLinksAddon)

onMounted(() => {
  term.open(terminal.value)
  term.writeln('Connecting to ' + url.value)
  term.loadAddon(attachAddon)
})

function onResize() {
  fitAddon.fit()
}
</script>
