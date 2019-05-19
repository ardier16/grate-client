<template>
  <div class="profile app__fill">
    <profile-form />
  </div>
</template>

<script>
import ProfileForm from '@/vue/forms/profile-form.vue'

export default {
  name: 'profile',
  components: { ProfileForm },
}
</script>
