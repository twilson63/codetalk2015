var h = require('hyperscript')
var c = require('./shared').c

module.exports = function () {
  return {
    template: template().outerHTML,
    scope: {
      profile: '=profile',
      data: '=data',
      select: '&select'
    }
  }
}

function template () {
  return h('div', [
    h('h3', ['{{profile}} starred repos']),
    h('.list-group', [
      h('a.list-group-item', {
        'data-ng-repeat': 'repo in data',
        'data-ng-click': 'select({repo: repo})'
      }, ['{{repo.name}}'])
    ])
  ])
}
