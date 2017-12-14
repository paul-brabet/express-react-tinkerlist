import {
  SPOTIFY_MYRECPLAYED_SUCCESS,
  SPOTIFY_MYRECPLAYED_FAILURE
} from '../actions/actions'

//need to find out format data arrives in
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

  case SPOTIFY_MYRECPLAYED_FAILURE: 
    return {
      state
    }

  default:
    return state
  }
}

export default recentlyPlayed