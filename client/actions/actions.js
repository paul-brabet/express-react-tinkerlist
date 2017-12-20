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

export const SPOTIFY_EVERYPLAYLISTTRACK_SUCCESS = 'SPOTIFY_EVERYPLAYLISTTRACK_SUCCESS'
export const SPOTIFY_EVERYPLAYLISTTRACK_FAILURE = 'SPOTIFY_EVERYPLAYLISTTRACK_FAILURE'

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

function getPlaylists (accessToken, endpoint, totalPlaylists) {
  if (!totalPlaylists) {
    const totalPlaylists = {}
  }
  return request
    .get(endpoint)
    .set('Authorization', 'Bearer ' + accessToken)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .then(function(res) {
      const endpoint = res.body.next
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

export function getEveryPlaylistTrack (accessToken) {
  return dispatch => {
    dispatch({type: SPOTIFY_LOADING})
    getPlaylists (accessToken, 'https://api.spotify.com/v1/me/playlists')
      .then(allPlaylists => {
        loopOverPlaylistsForTracks(allPlaylists, accessToken)
          .then(allTracks => {
            dispatch({type: SPOTIFY_NOT_LOADING})
            dispatch({type: SPOTIFY_EVERYPLAYLISTTRACK_SUCCESS, allTracks: allTracks})
          })
      })
      .catch(e => {
        console.log(e)
        dispatch({type: SPOTIFY_NOT_LOADING})
        dispatch({type: SPOTIFY_EVERYPLAYLISTTRACK_FAILURE, error:e})
      })
  }
}

async function loopOverPlaylistsForTracks (allPlaylists, accessToken) {
  let allTracks
  for (const playlist of allPlaylists.items) {
    const playlistTracksEndpoint = playlist.tracks.href
    await getPlaylistTracks(accessToken, playlistTracksEndpoint)
      .then(fullTrackList => {
        if (!allTracks) {
          return allTracks = fullTrackList
        } else {
          return allTracks.items = allTracks.items.concat(fullTrackList.items)
        }
      })
  }
  console.log(allTracks)
  return allTracks
}

function getPlaylistTracks (accessToken, endpoint, fullTrackList) {
  if (!fullTrackList) {
    let fullTrackList
  }
  return request
    .get(endpoint)
    .set('Authorization', 'Bearer ' + accessToken)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .then(function (res) {
      if (!fullTrackList) {
        fullTrackList = res.body
      } else {
        fullTrackList.items = fullTrackList.items.concat(res.body.items)
      }
      if (res.body.next) {
        return getPlaylistTracks(accessToken, res.body.next, fullTrackList)
      } else {
        return fullTrackList
      }
    })
}