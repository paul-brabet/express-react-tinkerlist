import {combineReducers} from 'redux'

import tokens from './tokens'
import loading from './loading'
import user from './user'
import recentlyPlayed from './recentlyPlayed'


export default combineReducers({
  tokens,
  loading,
  user,
  recentlyPlayed
})
