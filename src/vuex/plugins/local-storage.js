import { vuexTypes } from '../types'

const config = Object.freeze({
  STORAGE_KEY: 'gRate-store',
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

        if (!savedStore) {
          break
        }

        savedStore = JSON.parse(savedStore)

        store.replaceState({
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
    }
  })
}
