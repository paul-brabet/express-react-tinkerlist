import {combineReducers} from 'redux'

import tokens from './tokens'
import loading from './loading'
import user from './user'
import recentlyPlayed from './recentlyPlayed'
import allPlaylists from './allPlaylists'
import everyPlaylistTrack from './everyPlaylistTrack'
import remainingPlaylists from './remainingPlaylists'
import error from './error'

export default combineReducers({
  tokens,
  loading,
  user,
  recentlyPlayed,
  allPlaylists,
  everyPlaylistTrack,
  remainingPlaylists,
  error
})
