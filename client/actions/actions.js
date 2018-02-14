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

export const SPOTIFY_PLAYLISTSREMAINING = 'SPOTIFY_PLAYLISTSREMAINING'

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

// Export function govern dispatches
export function getAllUserPlaylists (accessToken) {
  return (dispatch) => {
    dispatch({type: SPOTIFY_LOADING})
    getPlaylists(accessToken, 'https://api.spotify.com/v1/me/playlists').then((data) => {
      dispatch({type: SPOTIFY_NOT_LOADING})
      dispatch({type: SPOTIFY_ALLPLAYLISTS_SUCCESS, data: data})
    }).catch((e) => {
      dispatch({type: SPOTIFY_NOT_LOADING})
      dispatch({type: SPOTIFY_ALLPLAYLISTS_FAILURE, error: e})
    })
  }
}

// Gets a list of the user's playlists. Calls itself again if it hasn't gotten all playlists (limit of 20 playlists per call)
function getPlaylists (accessToken, endpoint, totalPlaylists) {
  if (!totalPlaylists) {
    const totalPlaylists = {}
  }
  return request
    .get(endpoint)
    .set('Authorization', 'Bearer ' + accessToken)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .then(function (res) {
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
    .catch(function (err) {
      console.log(err.message)
    })
}

/**
 * Gets every track from every playlist
 */

// Export function handles most dispatches and function calls.
export function getEveryPlaylistTrack (accessToken) {
  return (dispatch) => {
    dispatch({type: SPOTIFY_LOADING})
    getPlaylists(accessToken, 'https://api.spotify.com/v1/me/playlists')
      .then((allPlaylists) => {
        loopOverPlaylistsForTracks(allPlaylists, accessToken, dispatch)
          .then((allTracks) => {
            dispatch({type: SPOTIFY_NOT_LOADING})
            dispatch({type: SPOTIFY_EVERYPLAYLISTTRACK_SUCCESS, allTracks: allTracks.items})
          })
      })
      .catch((e) => {
        console.log(e)
        dispatch({type: SPOTIFY_NOT_LOADING})
        dispatch({type: SPOTIFY_EVERYPLAYLISTTRACK_FAILURE, error: e})
      })
  }
}

// Calls getPlaylistTracks for every playlist. Tracks how many playlists are remaining. Returns allTracks once every track obtained
async function loopOverPlaylistsForTracks (allPlaylists, accessToken, dispatch) {
  let allTracks
  let remainingPlaylists = allPlaylists.items.length
  for (const playlist of allPlaylists.items) {
    dispatch({type: SPOTIFY_PLAYLISTSREMAINING, remaining: remainingPlaylists})
    const playlistTracksEndpoint = playlist.tracks.href
    await getPlaylistTracks(accessToken, playlistTracksEndpoint)
      .then((fullTrackList) => {
        remainingPlaylists--
        if (!allTracks) {
          allTracks = fullTrackList
        } else {
          allTracks.items = allTracks.items.concat(fullTrackList.items)
        }
      })
  }
  console.log(allTracks)
  return allTracks
}

// Gets all tracks from a playlist. Loops if it hasn't gotten all tracks (limit of 100 tracks per call)
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
      // DISABLED FOR TESTING PURPOSES ONLY
      // if (res.body.next) {
      //   return getPlaylistTracks(accessToken, res.body.next, fullTrackList)
      // } else {
        return fullTrackList
      // }
    })
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

function createSuperlist (accessToken, userId) {
  return request
    .post('https://api.spotify.com/v1/users/' + userId + '/playlists')
    .set('Authorization', 'Bearer ' + accessToken)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({name: 'Superlist'})
    .send({public: false})
    .send({description: 'A playlist created by Tinkerlist'})
    .then(function (res) {
      return res.body.tracks.href
    })
}

// Can make multiple API calls to push more than 100 tracks to a given playlist.
// Cannot add local songs. If the song is local, then will call findSpotifyTrack and add the result.
// If it cannot find a Spotify equivalent of the local song, will return an array of the failed searches.
// ** Incomplete as it doesn't return failedSearches yet **
async function addOneHundredPlusTracksToPlaylist (accessToken, location, tracks) {
  let trackUris = []
  let failedSearch = []
  for (let i = 0; i < tracks.length; i++) {
    const trackUri = tracks[i].track.uri
    if (trackUri.startsWith('spotify:local:')) {
      const searchedTrack = findSpotifyTrack(accessToken, tracks[i].track)
      if (searchedTrack.total === 0) {
        // failedSearch.push(searchedTrack.uri)
      } else if (searchedTrack.total === 1) {
        trackUris.push(searchedTrack.items[0].uri)
      }
    } else {
      trackUris.push(tracks[i].track.uri)
    }
    if (i + 1 === tracks.length) {
      return addToPlaylist(accessToken, location, trackUris)
    }
    if (Number.isInteger((i + 1) / 100)) {
      await addToPlaylist(accessToken, location, trackUris)
      trackUris = []
    }
  }
}

function addToPlaylist (accessToken, location, trackUris) {
  return request
    .post(location)
    .set('Authorization', 'Bearer ' + accessToken)
    .set('Accept', 'application/json')
    .set('Content-Type', 'applictracklistation/json')
    .send({'uris': trackUris})
    .then(function (res) {
      console.log(res.body)
    })
}

function findSpotifyTrack (accessToken, track) {
  const trackName = track.name
  const album = track.album.name
  const artistsArr = []
  for (let artist of track.artists) {
    artistsArr.push(artist.name)
  }
  const artistsWithSpaces = artistsArr.toString()
  const artists = artistsWithSpaces

  return request
    .get('https://api.spotify.com/v1/search')
    .set('Authorization', 'Bearer ' + accessToken)
    .set('Accept', 'application/json')
    .set('Content-Type', 'applictracklistation/json')
    .query({
      q: `album:${album} artist:${artists} track:${trackName}`,
      type: 'track'
    })
    .then(function (res) {
      return res.body
    })
}
