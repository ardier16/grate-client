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
  SET_FEED_POSTS: 'SET_FEED_POSTS',

  // profiles
  SET_PROFILES: 'SET_PROFILES',

  // friends
  SET_FRIENDS: 'SET_FRIENDS',
  SET_FRIENDS_SENT_REQUESTS: 'SET_FRIENDS_SENT_REQUESTS',
  SET_FRIENDS_RECEIVED_REQUESTS: 'SET_FRIENDS_RECEIVED_REQUESTS',
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
  LOAD_POST: 'LOAD_POST',
  LOAD_FEED: 'LOAD_FEED',
  CREATE_POST: 'CREATE_POST',
  UPDATE_POST: 'UPDATE_POST',
  DELETE_POST: 'DELETE_POST',
  CREATE_COMMENT: 'CREATE_COMMENT',
  UPDATE_COMMENT: 'UPDATE_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',

  // profiles
  LOAD_PROFILES: 'LOAD_PROFILES',

  // friends
  LOAD_FRIENDS: 'LOAD_FRIENDS',
  LOAD_FRIENDS_SENT_REQUESTS: 'LOAD_FRIENDS_SENT_REQUESTS',
  LOAD_FRIENDS_RECEIVED_REQUESTS: 'LOAD_FRIENDS_RECEIVED_REQUESTS',
  SEND_FRIEND_REQUEST: 'SEND_FRIEND_REQUEST',
  APPROVE_FRIEND_REQUEST: 'APPROVE_FRIEND_REQUEST',
  REJECT_FRIEND_REQUEST: 'REJECT_FRIEND_REQUEST',
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
  feedPosts: 'feedPosts',

  // profiles
  profiles: 'profiles',

  // friends
  friends: 'friends',
  friendsSentRequests: 'friendsSentRequests',
  friendsReceivedRequests: 'friendsReceivedRequests',
}

export const vuexTypes = {
  ...mutations,
  ...actions,
  ...getters,
}
