require('dotenv').config()

Feature('Login via Spotify')

Scenario('test something', (I) => {
  I.amOnPage('/')
  I.click('Login')
  I.see('LOG IN TO SPOTIFY')
  I.click('Log in to Spotify')
  I.fillField('username', process.env.SPOTIFY_TEST_EMAIL)
  I.fillField('password', process.env.SPOTIFY_TEST_PASSWORD)
  I.see('Remember me', '.row-submit')
  I.click('#g-recaptcha-button')
  // I.click('Okay')
  // I.seeInCurrentUrl('/#/user')
  I.waitForText('Logged in as Paul-test', 10)
})
