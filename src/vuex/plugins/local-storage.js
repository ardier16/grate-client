import { vuexTypes } from '../types'
import { CLIENT_LANGUAGES } from '@/js/const/client-languages'

const config = Object.freeze({
  STORAGE_KEY: 'gRate-store',
  LANGUAGE_KEY: 'gRate-lang',
})

export const localStoragePlugin = store => {
  store.subscribe((mutation, state) => {
    switch (mutation.type) {
      case vuexTypes.CLEAR_STATE: {
        localStorage.removeItem(config.STORAGE_KEY)
        break
      }
      case vuexTypes.POP_STATE: {
        let savedStore = localStorage.getItem(config.STORAGE_KEY)
        const savedLanguage = localStorage.getItem(config.LANGUAGE_KEY)

        if (!savedStore) {
          store.replaceState({
            ...state,
            language: savedLanguage,
          })
          break
        }

        savedStore = JSON.parse(savedStore)

        store.replaceState({
          language: savedLanguage,
          ...state,
          ...savedStore,
        })

        break
      }
      default:
        localStorage.setItem(
          config.STORAGE_KEY,
          JSON.stringify({ ...state })
        )
        localStorage.setItem(
          config.LANGUAGE_KEY,
          state.language || CLIENT_LANGUAGES.english
        )
    }
  })
}
