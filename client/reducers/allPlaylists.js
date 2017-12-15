import {
  SPOTIFY_ALLPLAYLISTS_SUCCESS,
  SPOTIFY_ALLPLAYLISTS_FAILURE
} from '../actions/actions'

const initialState = {
  allPlaylists: []
}

const allPlaylists = (state = initialState, action) => {
  switch (action.type) {
  case SPOTIFY_ALLPLAYLISTS_SUCCESS:
    return {
      ...state,
      allPlaylists: action.data.items 
    }

  case SPOTIFY_ALLPLAYLISTS_FAILURE: 
    return {
      state
    }

  default:
    return state
  }
}

export default allPlaylists
