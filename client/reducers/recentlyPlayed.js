import {
  SPOTIFY_MYRECPLAYED_SUCCESS
} from '../actions/actions'

const initialState = {
  tracks: []
}

const recentlyPlayed = (state = initialState, action) => {
  switch (action.type) {
  case SPOTIFY_MYRECPLAYED_SUCCESS:
    return {
      ...state,
      tracks: action.data.items
    }

  default:
    return state
  }
}

export default recentlyPlayed
