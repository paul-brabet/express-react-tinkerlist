import Spotify from 'spotify-web-api-js'
import request from 'superagent'
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


/** set the app's access and refresh tokens */
export function setTokens ({accessToken, refreshToken}) {
  if (accessToken) {
    spotifyApi.setAccessToken(accessToken)
  }
  return { type: SPOTIFY_TOKENS, accessToken, refreshToken }
}

/* get the user's info from the /me api */
export function getMyInfo () {
  return dispatch => {
    dispatch({type: SPOTIFY_LOADING})
    spotifyApi.getMe().then(data => {
      dispatch({type: SPOTIFY_ME_SUCCESS, data: data})
      dispatch({type: SPOTIFY_NOT_LOADING})
    }).catch(e => {
      dispatch({type: SPOTIFY_ME_FAILURE, error: e})
      dispatch({type: SPOTIFY_NOT_LOADING})      
    })
  }
}

export function getMyRecentlyPlayed () {
  return dispatch => {
    dispatch({type: SPOTIFY_LOADING})
    spotifyApi.getMyRecentlyPlayedTracks().then(data => {
      dispatch({type: SPOTIFY_MYRECPLAYED_SUCCESS, data: data})
      dispatch({type: SPOTIFY_NOT_LOADING})
    }).catch(e => {
      dispatch({type: SPOTIFY_MYRECPLAYED_FAILURE, error:e})
      dispatch({type: SPOTIFY_NOT_LOADING})
    })
  }
}

export function getUserPlaylists () {
  return dispatch => {
    dispatch({type: SPOTIFY_LOADING})
    spotifyApi.getUserPlaylists().then(data => {
      dispatch({type: SPOTIFY_NOT_LOADING})
      dispatch({type: SPOTIFY_ALLPLAYLISTS_SUCCESS, data: data})
    }).catch(e => {
      dispatch({type: SPOTIFY_NOT_LOADING})
      dispatch({type: SPOTIFY_ALLPLAYLISTS_FAILURE, error:e})
    })
  }
}

export function getAllUserPlaylists (accessToken) {
  return dispatch => {
    dispatch({type: SPOTIFY_LOADING})
    getPlaylists(accessToken, 'https://api.spotify.com/v1/me/playlists').then(data => {
      dispatch({type: SPOTIFY_NOT_LOADING})
      dispatch({type: SPOTIFY_ALLPLAYLISTS_SUCCESS, data: data})
    }).catch(e => {
      dispatch({type: SPOTIFY_NOT_LOADING})
      dispatch({type: SPOTIFY_ALLPLAYLISTS_FAILURE, error:e})
    })
  }
}

// function getPlaylists (accessToken) {
//   let endpoint = 'https://api.spotify.com/v1/me/playlists'
//   let totalPlaylists
//   while (endpoint) {
//     console.log('getPlaylist request sent')
//     request
//       .get(endpoint)
//       .set('Authorization', accessToken)
//       .then(function(res) {
//         endpoint = res.body.next
//         if (!totalPlaylists.items) {
//           totalPlaylists = res.body
//         } else {
//           totalPlaylists.items.concat(res.body.items)
//         }
//       })
//       .catch(function(err) {
//         err.message
//       })
//   }
//   return totalPlaylists
// }

function getPlaylists (accessToken, endpoint, totalPlaylists) {
  if (!totalPlaylists) {
    let totalPlaylists
  }
  return request
    .get(endpoint)
    .set('Authorization', 'Bearer ' + accessToken)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .then(function(res) {
      endpoint = res.body.next
      if (!totalPlaylists) {
        totalPlaylists = res.body
      } else {
        totalPlaylists.items = totalPlaylists.items.concat(res.body.items)
      }
      if (!res.body.next) {
        return totalPlaylists
      }
      return getPlaylists(accessToken, endpoint, totalPlaylists)
    })
    .catch(function(err) {
      console.log(err.message)
    })
}

// export function getUserPlaylists (recursiveList) {
//   return dispatch => {
//     dispatch({type: SPOTIFY_LOADING})
//     spotifyApi.getUserPlaylists().then(data => {
//       if (data.next) {
//         return getUserPlaylists(recursiveList)
//       }
//       dispatch({type: SPOTIFY_NOT_LOADING})
//       dispatch({type: SPOTIFY_ALLPLAYLISTS_SUCCESS, data: data})
//     }).catch(e => {
//       dispatch({type: SPOTIFY_NOT_LOADING})
//       dispatch({type: SPOTIFY_ALLPLAYLISTS_FAILURE, error:e})
//     })
//   }
// }