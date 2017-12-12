import request from 'superagent'

var widgetUrl = 'http://localhost:3000/widgets'

module.exports = {
  getWidgets: getWidgets,
  login: login
}

function getWidgets (callback) {
  request
    .get(widgetUrl)
    .end(function (err, res) {
      if (err) {
        callback(err)
      } else {
        callback(null, res.body)
      }
    })
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
