var github = require('octonode')
var PouchDB = require('pouchdb')

var response = require('palmettoflow-event').response
var responseError = require('palmettoflow-event').responseError


module.exports = function (config) {
  return function (ee) {
    ee.on('/github/repos/list', function (event) {
      var client = github.client(event.actor.token)
      client.me().starred(function (err, repos) {
        if (err) return ee.emit('send', responseError(event, {message: err.message }))
        ee.emit('send', response(event, repos))

        // repos = repos.map(function (repo) {
        //   repo._id = repo.id
        // })
        // db.allDocs({ include_docs: true }).then(function (result) {
        //   var docs = _(result.rows).pluck('doc')
        //   _(docs).each(function (doc) {
        //     var rdoc = _(repos).find({ _id: doc._id})
        //     if (rdoc) { rdoc._rev = doc._rev }
        //   })
        //   console.log(result)
        //   return repos
        // })
        //   .then(function (docs) {

        //     return docs
        //   })
        //   .then(db.bulkDocs)
        //   .then(function (result) {
        //     return db.compact()
        //   })
      })
    })
  }
}