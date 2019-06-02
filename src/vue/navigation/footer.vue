<template>
  <footer class="footer">
    <span class="footer__item footer__text">
      {{ 'footer.copyright' | globalize({ year: currentYear }) }}
    </span>

    <div class="footer__langs-wrp">
      <a
        class="footer__lang"
        :class="{
          'footer__lang--selected': language === CLIENT_LANGUAGES.english
        }"
        @click="changeLanguage(CLIENT_LANGUAGES.english)"
      >
        {{ 'languages.english' | globalize }}
      </a>

      <a
        class="footer__lang"
        :class="{
          'footer__lang--selected': language === CLIENT_LANGUAGES.russian
        }"
        @click="changeLanguage(CLIENT_LANGUAGES.russian)"
      >
        {{ 'languages.russian' | globalize }}
      </a>

      <a
        class="footer__lang"
        :class="{
          'footer__lang--selected': language === CLIENT_LANGUAGES.ukrainian
        }"
        @click="changeLanguage(CLIENT_LANGUAGES.ukrainian)"
      >
        {{ 'languages.ukrainian' | globalize }}
      </a>
    </div>
  </footer>
</template>

<script>
import { CLIENT_LANGUAGES } from '@/js/const/client-languages'

import { vuexTypes } from '@/vuex'
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'app-footer',

  data: _ => ({
    CLIENT_LANGUAGES,
  }),

  computed: {
    ...mapGetters({
      language: vuexTypes.language,
    }),

    currentYear () {
      return new Date().getFullYear()
    },
  },

  methods: {
    ...mapMutations({
      setLanguage: vuexTypes.SET_LANGUAGE,
    }),

    changeLanguage (language) {
      if (language !== this.language) {
        this.setLanguage(language)
        location.reload()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import "~@scss/variables";

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap-reverse;
  justify-content: center;
  width: 100%;
}

.footer__text {
  line-height: 2.5rem;
}

.footer__langs-wrp {
  margin-top: 0.6rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 -1rem 1rem;
  font-size: 1.4rem;
}

.footer__lang {
  margin: 0 1rem;
  cursor: pointer;

  &--selected {
    font-weight: 700;
  }
}
</style>
