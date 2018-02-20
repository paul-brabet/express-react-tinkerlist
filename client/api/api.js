import Spotify from 'spotify-web-api-js'
import request from 'superagent'
const spotifyApi = new Spotify()

export const SPOTIFY_PLAYLISTSREMAINING = 'SPOTIFY_PLAYLISTSREMAINING'

// Gets a list of the user's playlists. Calls itself again if it hasn't gotten all playlists (limit of 20 playlists per call)
export function getPlaylists (accessToken, endpoint, totalPlaylists) {
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

// Calls getPlaylistTracks for every playlist. Tracks how many playlists are remaining. Returns allTracks once every track obtained
export function loopOverPlaylistsForTracks (allPlaylists, accessToken, remaining) {
  let allTracks
  let remainingPlaylists = allPlaylists.items.length
  const promises = allPlaylists.items.map((playlist) => {
    return getPlaylistTracks(accessToken, playlist.tracks.href)
      .then((fulltracklist) => {
        remainingPlaylists--
        remaining(remainingPlaylists)
        return fulltracklist
      })
  })
  return Promise.all(promises)
    .then((alltracks) => {
      const allTracksReduced = alltracks.reduce((prev, curr) => [...prev, ...curr.items], [])
      return {items: allTracksReduced}
    })
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

export function createSuperlist (accessToken, userId) {
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
export async function addOneHundredPlusTracksToPlaylist (accessToken, location, tracks) {
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
