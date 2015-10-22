title: Offline Database
author:
  name: Tom Wilson
  twitter: twilson63
  url: http://www.jackhq.com
output: index.html
controls: true

--

# CodeTalk 2015

--

### About Me

* Tom Wilson
* Lead Technologist at Jack Russell Software
* @twilson63
* github.com/twilson63

--

# Offline Web

--

### Why?

* Mobile
* Latency
* Deadzones

--

### Offline Web

* AppCache
* Service Workers
* LocalStorage
* WebSQL
* IndexDB

--

# PouchDB

--

PouchDB is an open-source JavaScript database

--

### About PouchDB

* Cross Browser
* Lightweight (46KB)
* Easy to Learn
* Open Source

--

    var db = new PouchDB('dbname');

    db.put({
      _id: 'dave@gmail.com',
      name: 'David',
      age: 68
    });

    db.changes().on('change', function() {
      console.log('Ch-Ch-Changes');
    });

    db.replicate.to('http://example.com/mydb');

--

# Lets create an offline app

--

![ghstars](ghstars.jpeg)

> https://github.com/stars-lab

--

    https://github.com/twilson63/codetalk2015

--

* npm install
* npm run dev

--

    https://codetalk2015.herokuapp.com/

--

> factories/github

    var PouchDB = require('pouchdb')
    PouchDB.plugin(require('pouchdb-upsert'))

    var db = PouchDB('ghstars-repos')
    var rdb = window.rdb = PouchDB('ghstars-readmes')

--

> factories/github

    var _ = require('underscore')

    function local(access_token) {
      return function (repos) {
        _(repos).each(upsert)
        return repos
      }
    }

--

> factories/github

    function upsert(repo) {
      db.upsert(repo.full_name, function (doc) {
        return _(doc).extend(repo)
      })
      .catch(function (err) {
        console.log(err)
      })
    }

--

> factories/github

    function readme (res) {
      return readme(access_token, repo.full_name)
        .then(function (readme) {
          return rdb.upsert(repo.full_name, function (doc) {
            return _(doc).extend(readme.object)
          })
        })
    }

--

> factories/github

    function upsert(repo) {
      db.upsert(repo.full_name, function (doc) {
        return _(doc).extend(repo)
      })
      .then(readme)
      .catch(function (err) {
        console.log(err)
      })
    }

--

> factories/github

    function readme (access_token, name) {
      return $http.post('/api',
        newEvent('github/readmes', 'get', {
        name: name
      }, {
        token: access_token
      }))
      .then(function (result) {
        return result.data.object
      })
    }
--

> factories/github

    function readme (access_token, name) {
      return $q.when(rdb.get(name))
    }

--

http://jsbin.com/kezixo/1/edit?js,console,output

