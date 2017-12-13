import request from 'superagent'
import Spotify from 'spotify-web-api-js'

const spotifyApi = new Spotify()

module.exports = {
  login: login
}

function login (callback) {
  request
    .get('/api/v1/login')
    .end((err, res) => {
      if (err) {
        callback(err)
      } else {
        callback(null, res.body)
      }
    })
}

function setToken({accessToken, refreshToken}) {
  if (accessToken) {
    spotifyApi.setAccessToken(accessToken)
  }
}

function getMyInfo () {
  spotifyApi.getMe()
}