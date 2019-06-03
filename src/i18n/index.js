import moment from 'moment'

import { store, vuexTypes } from '@/vuex'
import { CLIENT_LANGUAGES } from '@/js/const/client-languages'

const language = store.getters[vuexTypes.language]
let i18n

switch (language) {
  case CLIENT_LANGUAGES.english:
    moment.locale('en')
    i18n = require(`./en`)
    break
  case CLIENT_LANGUAGES.russian:
    moment.locale('ru')
    i18n = require(`./ru`)
    break
  case CLIENT_LANGUAGES.ukrainian:
    moment.locale('uk')
    i18n = require(`./uk`)
    break
  default:
    throw new Error('Locale not found')
}

export const i18nOptions = {
  lng: language,
  debug: false,
  resources: {
    english: {
      translation: {
        ...i18n.translations,
      },
    },
    russian: {
      translation: {
        ...i18n.translations,
      },
    },
    ukrainian: {
      translation: {
        ...i18n.translations,
      },
    },
  },
  whitelist: ['english', 'russian', 'ukrainian'],
  // set to true if you need en-US/en-UK lng's:
  nonExplicitWhitelist: false,
  interpolation: {
    format: (param, format) => {
      switch (format.toLowerCase()) {
        case 'date':
          return moment(param).fromNow()
        case 'calendar':
          return moment(param).calendar(null, {
            sameDay: i18n.config.date.formats.same_day,
            lastDay: i18n.config.date.formats.last_day,
            nextDay: i18n.config.date.formats.next_day,
            lastWeek: i18n.config.date.formats.last_week,
            nextWeek: i18n.config.date.formats.next_week,
            sameElse: i18n.config.date.presets.datetime,
          })
        default:
          console.warn(`Unknown format: ${format}, skipping..`)
          return param
      }
    },
  },
}
