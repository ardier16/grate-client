const mutations = {
  // root
  CLEAR_STATE: 'CLEAR_STATE',
  POP_STATE: 'POP_STATE',

  // auth
  SET_AUTH_TOKEN: 'SET_AUTH_TOKEN',
}

const actions = {
  SIGN_IN: 'SIGN_IN',
  SIGN_UP: 'SIGN_UP',
  SIGN_OUT: 'SIGN_OUT',
}

const getters = {
  authToken: 'authToken',
  isSignedIn: 'isSignedIn',
}

export const vuexTypes = {
  ...mutations,
  ...actions,
  ...getters,
}
