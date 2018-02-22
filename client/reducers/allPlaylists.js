import {
  SPOTIFY_ALLPLAYLISTS_SUCCESS
} from '../actions/actions'

const initialState = {
  href: null,
  items: [{
    name: null,
    id: null
  }]
}

const allPlaylists = (state = initialState, action) => {
  switch (action.type) {
  case SPOTIFY_ALLPLAYLISTS_SUCCESS:
    return {
      ...state,
      href: action.data.href,
      items: action.data.items
    }

  default:
    return state
  }
}

export default allPlaylists
