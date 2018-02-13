import {
  SPOTIFY_PLAYLISTSREMAINING
} from '../actions/actions'

const initialState = {
  playlistsRemaining: null
}

const remainingPlaylists = (state = initialState, action) => {
  switch (action.type) {
  case SPOTIFY_PLAYLISTSREMAINING:
    return {
      ...state,
      playlistsRemaining: action.remaining
    }

  default:
    return state
  }
}

export default remainingPlaylists
