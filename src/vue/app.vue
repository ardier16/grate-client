<template>
  <div id="app">
    <router-view />
    <status-message />
  </div>
</template>

<script>
import StatusMessage from '@/vue/common/status-message.vue'

export default {
  name: 'app',
  components: { StatusMessage },
}
</script>
