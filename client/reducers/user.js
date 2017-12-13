import {
  SPOTIFY_ME_BEGIN,
  SPOTIFY_ME_SUCCESS,
  SPOTIFY_ME_FAILURE
} from '../actions/actions'

const initialState = {
  loading: false,
  country: null,
  display_name: null,
  email: null,
  external_urls: {},
  followers: {},
  href: null,
  id: null,
  images: [],
  product: null,
  type: null,
  uri: null
}

const user = (state = initialState, action) => {
  switch (action.type) {

  // set our loading property when the loading begins
  case SPOTIFY_ME_BEGIN:
    return {
      ...state,
      loading: true
    }

  // when we get the data merge it in
  case SPOTIFY_ME_SUCCESS:
    return {
      loading: false,
      country: action.data.country,
      display_name: action.data.display_name,
      email: action.data.email,
      external_urls: Object.assign({}, action.data.external_urls),
      followers: Object.assign({}, action.data.followers),
      href: action.data.href,
      id: action.data.id,
      images: Array.from(action.data.images),
      product: action.data.product,
      type: action.data.type,
      uri: action.data.uri
    }

  // currently no failure state :(
  case SPOTIFY_ME_FAILURE:
    return state;

  default:
    return state;
  }
}

export default user
