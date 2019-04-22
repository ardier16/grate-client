<template>
  <div class="profile">
    <profile-form />
  </div>
</template>

<script>
import ProfileForm from '@/vue/forms/profile-form'

export default {
  name: 'profile',
  components: { ProfileForm },
}
</script>
