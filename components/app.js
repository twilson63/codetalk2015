var h = require('hyperscript')
var ngIf = require('./shared').ngIf
var c = require('./shared').c

module.exports = function () {
  return {
    template: template().outerHTML,
    controller: [
      '$scope',
      'auth',
      'github',
      'store',
      controller]
  }
}

function controller ($scope, auth, github, store) {
  $scope.route = 'login'
  if (!store.get('profile')) {
    signin()
  } else {
    list()
  }
  function signin() {
    auth.signin({}, function (profile, token) {
      store.set('profile', profile)
      store.set('token', token)

    })
  }

  function list() {
    var profile = store.get('profile')
    $scope.nickname = profile.nickname
    $scope.accessToken = profile.identities[0].access_token
    github.repos($scope.accessToken)
      .then(function (repos) {
        $scope.repos = repos
        $scope.route = 'repos'
      })
      .catch(function (err) {
        $scope.error = err.message
        $scope.route = 'error'
      })
  }

  $scope.select = function (repo) {
    $scope.repo = repo
    github.readme($scope.accessToken, repo.full_name)
      .then(function (result) {
        $scope.readme = result
        $scope.route = 'readme'
      })
  }

  $scope.done = function () {
    $scope.repo = null
    $scope.readme = null
    $scope.route = 'repos'
  }

  $scope.logout = function () {
    store.remove('profile')
    store.remove('token')
    signin()
  }

}

function template () {
  return h('div', [
    h('nav.navbar.navbar-default', [
      h('.container-fluid', [
        h('.navbar-header', [
          h('a.navbar-brand', ['StarLORD'])
        ]),
        h('ul.nav.navbar-nav.navbar-right', [
          h('li', [
            h('a', { href: '#', 'data-ng-click': 'logout()'}, 'Logout')
          ])
        ])
      ])
    ]),
    h('.container', [
      ngIf('route === "repos"',
        c('repos', {
          profile: 'nickname',
          data: 'repos',
          select: 'select(repo)'
        })
      ),
      ngIf('route === "readme"',
        c('readme', { content: 'readme', done: 'done()' })
      )
    ])
  ])
}



