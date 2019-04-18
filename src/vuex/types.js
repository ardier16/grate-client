const mutations = {
  // root
  CLEAR_STATE: 'CLEAR_STATE',
  POP_STATE: 'POP_STATE',

  // auth
  SET_AUTH_TOKEN: 'SET_AUTH_TOKEN',
  SET_USER_ID: 'SET_USER_ID',
}

const actions = {
  SIGN_IN: 'SIGN_IN',
  SIGN_UP: 'SIGN_UP',
  SIGN_OUT: 'SIGN_OUT',
}

const getters = {
  authToken: 'authToken',
  isSignedIn: 'isSignedIn',
  userId: 'userId',
}

export const vuexTypes = {
  ...mutations,
  ...actions,
  ...getters,
}
