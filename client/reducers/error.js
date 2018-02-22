import {
  ERROR_MESSAGE
} from '../actions/actions'

const initialState = {
  errorMessage: null
}

const error = (state = initialState, action) => {
  switch (action.type) {
  case ERROR_MESSAGE:
    return {
      ...state,
      errorMessage: action.error
    }

  default:
    return state
  }
}

export default error
