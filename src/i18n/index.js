import moment from 'moment'

const language = 'en'
let i18n

switch (language) {
  case 'en':
    i18n = require(`./en`)
    break
  default:
    throw new Error('Locale not found')
}

export const i18nOptions = {
  lng: language,
  debug: false,
  resources: {
    en: {
      translation: {
        ...i18n.translations,
      },
    },
  },
  whitelist: ['en'],
  // set to true if you need en-US/en-UK lng's:
  nonExplicitWhitelist: false,
  interpolation: {
    format: (param, format) => {
      switch (format.toLowerCase()) {
        case 'date':
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
