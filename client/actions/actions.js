import Spotify from 'spotify-web-api-js'
const spotifyApi = new Spotify()

// our constants
export const SPOTIFY_TOKENS = 'SPOTIFY_TOKENS'

export const SPOTIFY_LOADING = 'SPOTIFY_LOADING'
export const SPOTIFY_NOT_LOADING = 'SPOTIFY_NOT_LOADING'

export const SPOTIFY_ME_SUCCESS = 'SPOTIFY_ME_SUCCESS'
export const SPOTIFY_ME_FAILURE = 'SPOTIFY_ME_FAILURE'

export const SPOTIFY_MYRECPLAYED_SUCCESS = 'SPOTIFY_MYRECPLAYED_SUCCESS'
export const SPOTIFY_MYRECPLAYED_FAILURE = 'SPOTIFY_MYRECPLAYED_FAILURE'


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
