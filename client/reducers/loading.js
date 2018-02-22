import {
  SPOTIFY_LOADING,
  SPOTIFY_NOT_LOADING
} from '../actions/actions'

const initialState = {
  loading: false
}

const loading = (state = initialState, action) => {
  switch (action.type) {
  case SPOTIFY_LOADING:
    return {
      ...state,
      loading: true
    }

  case SPOTIFY_NOT_LOADING:
    return {
      ...state,
      loading: false
    }

  default:
    return state
  }
}

export default loading
