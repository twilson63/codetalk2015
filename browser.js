var h = require('hyperscript')

document.head.appendChild(
  h('link', { rel: 'stylesheet', href: 'css/bootstrap.css'})
)

document.body.appendChild(
  h('app')
)

window.Auth0Lock = require('auth0-lock')
var angular = window.angular = require('angular')
require('auth0-angular')

angular.module('app', [
  'auth0',
  require('angular-storage')
])
.config(function (authProvider) {
  authProvider.init({
    domain: 'twilson63.auth0.com',
    clientID: 'W8PcidqW293owbiVkoysasncwrdFdzRz'
  })
})
.run(function (auth) {
  auth.hookEvents()
})
.directive('app', require('./components/app'))
.directive('repos', require('./components/repos'))
.directive('readme', require('./components/readme'))
.factory('github', ['$http', '$q', require('./factories/github')])

angular.element(document).ready(function () {
  angular.bootstrap(document, ['app'])
})