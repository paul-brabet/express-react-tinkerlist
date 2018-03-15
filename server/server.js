var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var cookieParser = require('cookie-parser')

var apiRouter = require('./routes/routes')

var server = express()

server.use(cookieParser())
server.use(bodyParser.json())

server.use(express.static(path.join(__dirname, '../public')))
server.use('/api/v1', apiRouter)

module.exports = server
