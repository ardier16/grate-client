<template>
  <div class="create-post">
    <post-form />
  </div>
</template>

<script>
import PostForm from '@/vue/forms/post-form.vue'

export default {
  name: 'create-post',
  components: { PostForm },
}
</script>
