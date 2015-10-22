var github = require('octonode')

var response = require('palmettoflow-event').response
var responseError = require('palmettoflow-event').responseError


module.exports = function (config) {
  return function (ee) {
    ee.on('/github/readmes/get', function (event) {
      var client = github.client(event.actor.token)
      client.repo(event.object.name).readme(function (err, readme) {
        if (err) return ee.emit('send', responseError(event, {message: err.message }))
        var buf = new Buffer(readme.content, 'base64')
        var doc = {
          content: buf.toString(),
          _id: event.object.name
        }
        ee.emit('send', response(event, doc))
      })
    })
  }
}