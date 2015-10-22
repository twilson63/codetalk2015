require('./services')
var http = require('http')
var jsonBody = require('body/json')
var sendJSON = require('send-data/json')
var sendError = require('send-data/error')
var h = require('hyperscript')
var ecstatic = require('ecstatic')
var api = require('./api')

var server = http.createServer(function (req, res) {
  if (req.method === 'POST' && req.url === '/api') {
    //return sendError(req, res, { body: 'error'})
    return jsonBody(req, res, function (err, body) {
      if (err) return sendError(req, res, { body: err.message })
      api(body, function (err, response) {
        if (err) return sendError(req, res, { body: err.message })
        sendJSON(req, res, response)
      })
    })
  }

  if (req.url === '/') req.url = '/index.html'

  ecstatic('www')(req, res)
})

server.listen(process.env.PORT || 3000)

