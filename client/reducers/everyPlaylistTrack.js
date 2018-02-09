import {
  SPOTIFY_EVERYPLAYLISTTRACK_SUCCESS,
  SPOTIFY_EVERYPLAYLISTTRACK_FAILURE
} from '../actions/actions'

const initialState = {
  everyPlaylistTrack: []
}

const everyPlaylistTrack = (state = initialState, action) => {
  switch (action.type) {
  case SPOTIFY_EVERYPLAYLISTTRACK_SUCCESS:
    return {
      ...state,
      everyPlaylistTrack: action.allTracks
    }

  case SPOTIFY_EVERYPLAYLISTTRACK_FAILURE: 
    return {
      state
    }

  default:
    return state
  }
}

export default everyPlaylistTrack