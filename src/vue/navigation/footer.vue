<template>
  <footer class="footer">
    <span class="footer__item footer__text">
      {{ 'footer.copyright' | globalize({ year: currentYear }) }}
    </span>
  </footer>
</template>

<script>
export default {
  name: 'app-footer',

  computed: {
    currentYear () {
      return new Date().getFullYear()
    },
  },
}
</script>

<style lang="scss" scoped>
@import "~@scss/variables";

.footer {
  display: flex;
  align-items: center;
  flex-wrap: wrap-reverse;
  justify-content: center;
  width: 100%;
}

.footer__text {
  line-height: 2.5rem;
}
</style>
