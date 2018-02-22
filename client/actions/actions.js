import Spotify from 'spotify-web-api-js'
import request from 'superagent'
import {
  getPlaylists,
  loopOverPlaylistsForTracks,
  getPlaylistTracks,
  createSuperlist,
  addOneHundredPlusTracksToPlaylist
} from '../api/api'
const spotifyApi = new Spotify()

// our constants
export const SPOTIFY_TOKENS = 'SPOTIFY_TOKENS'

export const SPOTIFY_LOADING = 'SPOTIFY_LOADING'
export const SPOTIFY_NOT_LOADING = 'SPOTIFY_NOT_LOADING'

export const SPOTIFY_ME_SUCCESS = 'SPOTIFY_ME_SUCCESS'
export const SPOTIFY_ME_FAILURE = 'SPOTIFY_ME_FAILURE'

export const SPOTIFY_MYRECPLAYED_SUCCESS = 'SPOTIFY_MYRECPLAYED_SUCCESS'
export const SPOTIFY_MYRECPLAYED_FAILURE = 'SPOTIFY_MYRECPLAYED_FAILURE'

export const SPOTIFY_ALLPLAYLISTS_SUCCESS = 'SPOTIFY_ALLPLAYLISTS_SUCCESS'
export const SPOTIFY_ALLPLAYLISTS_FAILURE = 'SPOTIFY_ALLPLAYLISTS_FAILURE'

export const SPOTIFY_EVERYPLAYLISTTRACK_SUCCESS = 'SPOTIFY_EVERYPLAYLISTTRACK_SUCCESS'
export const SPOTIFY_EVERYPLAYLISTTRACK_FAILURE = 'SPOTIFY_EVERYPLAYLISTTRACK_FAILURE'

export const SPOTIFY_PLAYLISTSREMAINING = 'SPOTIFY_PLAYLISTSREMAINING'

export const ERROR_MESSAGE = 'ERROR_MESSAGE'

/** set the app's access and refresh tokens */
export function setTokens ({accessToken, refreshToken}) {
  if (accessToken) {
    spotifyApi.setAccessToken(accessToken)
  }
  return {type: SPOTIFY_TOKENS, accessToken, refreshToken}
}

/* get the user's info from the /me api */
export function getMyInfo () {
  return (dispatch) => {
    dispatch({type: SPOTIFY_LOADING})
    spotifyApi.getMe().then((data) => {
      dispatch({type: SPOTIFY_ME_SUCCESS, data: data})
      dispatch({type: SPOTIFY_NOT_LOADING})
    }).catch((e) => {
      dispatch({type: SPOTIFY_ME_FAILURE, error: e})
      dispatch({type: SPOTIFY_NOT_LOADING})
    })
  }
}

export function getMyRecentlyPlayed () {
  return (dispatch) => {
    dispatch({type: SPOTIFY_LOADING})
    spotifyApi.getMyRecentlyPlayedTracks().then((data) => {
      dispatch({type: SPOTIFY_MYRECPLAYED_SUCCESS, data: data})
      dispatch({type: SPOTIFY_NOT_LOADING})
    }).catch((e) => {
      dispatch({type: SPOTIFY_MYRECPLAYED_FAILURE, error: e})
      dispatch({type: SPOTIFY_NOT_LOADING})
    })
  }
}

export function getUserPlaylists () {
  return (dispatch) => {
    dispatch({type: SPOTIFY_LOADING})
    spotifyApi.getUserPlaylists().then((data) => {
      dispatch({type: SPOTIFY_NOT_LOADING})
      dispatch({type: SPOTIFY_ALLPLAYLISTS_SUCCESS, data: data})
    }).catch((e) => {
      dispatch({type: SPOTIFY_NOT_LOADING})
      dispatch({type: SPOTIFY_ALLPLAYLISTS_FAILURE, error: e})
    })
  }
}

/**
 * Gets all playlists.
 */

export function getAllUserPlaylists (accessToken) {
  return (dispatch) => {
    dispatch({type: SPOTIFY_LOADING})
    getPlaylists(accessToken, 'https://api.spotify.com/v1/me/playlists')
      .then((data) => {
        dispatch({type: SPOTIFY_NOT_LOADING})
        dispatch({type: SPOTIFY_ALLPLAYLISTS_SUCCESS, data: data})
      })
  }
}

/**
 * Gets every track from every playlist
 */

// Export function handles most dispatches and function calls.
export function getEveryPlaylistTrack (accessToken) {
  return (dispatch) => {
    const playlistsRemain = (numRemaining) => dispatch({type: SPOTIFY_PLAYLISTSREMAINING, remaining: numRemaining})
    dispatch({type: SPOTIFY_LOADING})
    getPlaylists(accessToken, 'https://api.spotify.com/v1/me/playlists')
      .then((allPlaylists) => {
        const requests = loopOverPlaylistsForTracks(allPlaylists, accessToken, playlistsRemain)
          .then((allTracks) => {
            dispatch({type: SPOTIFY_NOT_LOADING})
            dispatch({type: SPOTIFY_EVERYPLAYLISTTRACK_SUCCESS, allTracks: allTracks.items})
          })
      })
      .catch((e) => {
        dispatch({type: SPOTIFY_NOT_LOADING})
        dispatch({type: SPOTIFY_EVERYPLAYLISTTRACK_FAILURE, error: e})
      })
  }
}

/**
 *  Creates a playlist called 'Superlist' and then fills it with all tracks
 */

export function createAndFillSuperlist (accessToken, userId, tracks) {
  return (dispatch) => {
    dispatch({type: SPOTIFY_LOADING})
    createSuperlist(accessToken, userId)
      .then(function (location) {
        addOneHundredPlusTracksToPlaylist(accessToken, location, tracks)
          .then(function () {
            dispatch({type: SPOTIFY_NOT_LOADING})
          })
      })
      .catch((e) => {
        console.log(e)
        dispatch({type: SPOTIFY_NOT_LOADING})
      })
  }
}

export function error (message) {
  return ({
    type: ERROR_MESSAGE,
    errorMessage: message
  })
}

export function notLoading () {
  return ({
    type: SPOTIFY_NOT_LOADING
  })
}
