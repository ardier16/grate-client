<template>
  <div class="create-post">
    <create-post-form />
  </div>
</template>

<script>
import CreatePostForm from '@/vue/forms/create-post-form'

export default {
  name: 'create-post',
  components: { CreatePostForm },
}
</script>
