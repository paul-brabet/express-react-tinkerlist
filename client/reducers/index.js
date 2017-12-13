import {combineReducers} from 'redux'

import tokens from './tokens'
import loading from './loading'
import user from './user'

export default combineReducers({
  tokens,
  loading,
  user
})
