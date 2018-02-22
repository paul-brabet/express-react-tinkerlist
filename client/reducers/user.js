import {
  SPOTIFY_ME_SUCCESS
} from '../actions/actions'

const initialState = {
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
  // when we get the data merge it in
  case SPOTIFY_ME_SUCCESS:
    return {
      ...state,
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

  default:
    return state
  }
}

export default user
