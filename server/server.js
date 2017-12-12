var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var path = require('path')

var apiRouter = require('./routes/api-routes')

var server = express()

server.use('/api/v1', apiRouter)
server.use(bodyParser.json())
server.use(cors({origin: 'http://localhost:8080'}))
server.use(express.static(path.join(__dirname, '../public')))

module.exports = server
