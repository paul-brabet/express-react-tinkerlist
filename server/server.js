var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var cookieParser = require('cookie-parser')

var apiRouter = require('./routes/api-routes')

var server = express()

server.use(cookieParser())
server.use('/api/v1', apiRouter)
server.use(bodyParser.json())
server.use(express.static(path.join(__dirname, '../public')))

module.exports = server
