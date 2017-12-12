import request from 'superagent'

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
