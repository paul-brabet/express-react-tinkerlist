var Spotify = require('spotify-web-api-node')
var express = require('express')
var router = new express.Router()
require('dotenv').config()

var clientId = process.env.CLIENT_ID
var clientSecret = process.env.CLIENT_SECRET
var redirectUri = process.env.REDIRECT_URI
var stateKey = 'spotify_auth_state'
var scope = [
  'user-read-private',
  'user-read-email',
  'user-read-recently-played',
  'playlist-read-private',
  'playlist-read-collaborative',
  'playlist-modify-private',
  'playlist-modify-public'
]

/** Configure spotify */
const spotifyApi = new Spotify({
  clientId: clientId,
  clientSecret: clientSecret,
  redirectUri: redirectUri
})

/** Generates a random string containing numbers and letters of N characters */
const generateRandomString = (N) => (Math.random().toString(36) + Array(N).join('0')).slice(2, N + 2)

/** Login endpoint
 *  Stores a random string in cookies before redirecting to Spotify for login
 */
router.get('/login', (_, res) => {
  console.log('/login path hit')
  const state = generateRandomString(16)
  res.cookie(stateKey, state)
  res.redirect(spotifyApi.createAuthorizeURL(scope, state))
})

/** When Spotify is done with the user logging in, it redirects to this to callback
 *  This checks that the random string we provided earlier matches.
 *  If match = true, then forwards to user page
 *  Else forwards to error page
 */
router.get('/callback', (req, res) => {
  console.log('/callback path hit')
  const {code, state} = req.query
  const storedState = req.cookies ? req.cookies[stateKey] : null
  // first do state validation
  if (state === null || state !== storedState) {
    res.redirect('/#/error/state mismatch')
  // if the state is valid, get the authorization code and pass it on to the client
  } else {
    res.clearCookie(stateKey)
    // Retrieve an access token and a refresh token
    spotifyApi.authorizationCodeGrant(code)
      .then((data) => {
        const expiresIn = data.body.expires_in
        const accessToken = data.body.access_token
        const refreshToken = data.body.refresh_token
        console.log(data.body)
        // Set the access token on the API object to use it in later calls
        spotifyApi.setAccessToken(accessToken)
        spotifyApi.setRefreshToken(refreshToken)

        // use the access token to access the Spotify Web API
        spotifyApi.getMe().then(({body}) => {
          console.log(body)
        })

        // we can also pass the token to the browser to make requests from there
        res.redirect(`/#/user/${accessToken}/${refreshToken}`)
      })
      .catch((err) => {
        console.log(err)
        res.redirect('/#/error/invalid token')
      })
  }
})

module.exports = router
