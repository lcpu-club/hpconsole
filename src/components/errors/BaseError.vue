<template>
  <div
    class="p-6 w-full h-full flex items-center flex-wrap-reverse justify-center"
  >
    <div>
      <img :src="url" class="w-64" />
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const rand = (Math.floor(Math.random() * 13) + 1).toString().padStart(2, '0')
const url = `https://www.lovelive-anime.jp/nijigasaki/worldwide/img/tv/member/c${rand}.png?v2`
</script>
