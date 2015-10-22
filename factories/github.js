var newEvent = require('palmettoflow-event').newEvent

//var PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-upsert'))

var db = PouchDB('repos3')
var rdb = window.rdb = PouchDB('readmes3')

var _ = require('underscore')

module.exports = function ($http, $q) {
  function readme (access_token, name) {
    //return $q.when(rdb.get(name))
    return $http.post('/api', newEvent('github/readmes', 'get', {
      name: name
    }, {
      token: access_token
    }))
    .then(function (result) {
      return result.data.object
    })
  }


  function repos(access_token) {
    function local(access_token) {
      function readme (res) {
        return readme(access_token, repo.full_name)
          .then(function (readme) {
            return rdb.upsert(repo.full_name, function (doc) {
              return _(doc).extend(readme.object)
            })
          })
      }
      return function (repos) {
        function upsert(repo) {
          db.upsert(repo.full_name, function (doc) {
            return _(doc).extend(repo)
          })
          .then(readme)
          .catch(function (err) {
            console.log(err)
          })
        }

        _(repos).each(upsert)
        return repos
      }
    }

    return $http.post('/api', newEvent('github/repos', 'list', {}, {
      token: access_token
    }))
    .then(function (result) {
      return result.data
    })
    .then(function (event) {
      return event.object
    })
    .then(local(access_token))
    .catch(function (err) {
      console.log('error getting docs')
      return db.allDocs({ include_docs: true})
        .then(function (result) {
          return _(result.rows).pluck('doc')
        })
    })
  }

  return {
    repos: repos,
    readme: readme
  }
}