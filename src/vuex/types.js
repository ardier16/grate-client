const mutations = {
  // root
  CLEAR_STATE: 'CLEAR_STATE',
  POP_STATE: 'POP_STATE',

  // auth
  SET_AUTH_TOKEN: 'SET_AUTH_TOKEN',
  SET_USER_ID: 'SET_USER_ID',

  // profile
  SET_PROFILE: 'SET_PROFILE',

  // posts
  SET_POSTS: 'SET_POSTS',
}

const actions = {
  // auth
  SIGN_IN: 'SIGN_IN',
  SIGN_UP: 'SIGN_UP',
  SIGN_OUT: 'SIGN_OUT',

  // profile
  CREATE_PROFILE: 'CREATE_PROFILE',
  UPDATE_PROFILE: 'UPDATE_PROFILE',
  LOAD_PROFILE: 'LOAD_PROFILE',

  // posts
  LOAD_POSTS: 'LOAD_POSTS',
}

const getters = {
  // auth
  authToken: 'authToken',
  isSignedIn: 'isSignedIn',
  userId: 'userId',

  // profile
  profile: 'profile',

  // posts
  posts: 'posts',
}

export const vuexTypes = {
  ...mutations,
  ...actions,
  ...getters,
}
