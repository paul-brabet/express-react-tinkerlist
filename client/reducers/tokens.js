import {SPOTIFY_TOKENS} from '../actions/actions'

const initialState = {
  accessToken: null,
  refreshToken: null
}

const tokens = (state = initialState, action) => {
  switch (action.type) {
  // when we get the tokens... set the tokens!
  case SPOTIFY_TOKENS:
    return {
      ...state,
      accessToken: action.accessToken,
      refreshToken: action.refreshToken
    }

  default:
    return state
  }
}

export default tokens
