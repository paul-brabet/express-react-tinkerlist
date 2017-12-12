var Spotify = require('spotify-web-api-node')
var express = require('express')
var router = new express.Router()
require('dotenv').config()

var client_id = process.env.CLIENT_ID
var client_secret = process.env.CLIENT_SECRET
var redirect_uri = process.env.REDIRECT_URI
var state_key = 'spotify_auth_state'
var scope = ['user-read-private', 'user-read-email', 'user-read-recently-played']

/** Configure spotify */
const spotifyApi = new Spotify({
  clientId: client_id,
  clientSecret: client_secret,
  redirectUri: redirect_uri
})

/** Generates a random string containing numbers and letters of N characters */
const generateRandomString = N => (Math.random().toString(36)+Array(N).join('0')).slice(2, N+2)

/** Login endpoint 
 *  Stores a random string in cookies before redirecting to Spotify for login
 */
router.get('/login', (_, res) => {
  console.log('/login path hit')
  const state = generateRandomString(16)
  res.cookie(state_key, state)
  res.redirect(spotifyApi.createAuthorizeURL(scope, state))
})

/** When Spotify is done with the user logging in, it redirects to this to callback
 *  This checks that the random string we provided earlier matches.
 *  If match = true, then forwards to user page
 *  Else forwards to error page
 */
router.get('/callback', (req, res) => {
  console.log('/callback path hit')
  const { code, state } = req.query
  const storedState = req.cookies ? req.cookies[state_key] : null
  // first do state validation
  if (state === null || state !== storedState) {
    res.redirect('/#/error/state mismatch')
  // if the state is valid, get the authorization code and pass it on to the client
  } else {
    res.clearCookie(state_key)
    // Retrieve an access token and a refresh token
    spotifyApi.authorizationCodeGrant(code).then(data => {
      const { expires_in, access_token, refresh_token } = data.body
      console.log(data.body)
      // Set the access token on the API object to use it in later calls
      spotifyApi.setAccessToken(access_token)
      spotifyApi.setRefreshToken(refresh_token)

      // use the access token to access the Spotify Web API
      spotifyApi.getMe().then(({ body }) => {
        console.log(body)
      })

      // we can also pass the token to the browser to make requests from there
      res.redirect(`/#/user/${access_token}/${refresh_token}`)
    }).catch(err => {
      res.redirect('/#/error/invalid token')
    })
  }
})

module.exports = router
