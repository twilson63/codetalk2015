var h = require('hyperscript')
var _ = require('underscore')

exports.ngIf = ngIf
exports.c = c

function ngIf (expr, content) {
  return h('div', { 'data-ng-if': expr}, content)
}

function c (name, ngAttrs) {
  var dataAttrs = _.object(_(ngAttrs).keys().map(function (k) {
    return ['data-' + k, ngAttrs[k]]
  }))
  return h(name, dataAttrs)
}