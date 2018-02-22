import {
  SPOTIFY_EVERYPLAYLISTTRACK_SUCCESS
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

  default:
    return state
  }
}

export default everyPlaylistTrack
