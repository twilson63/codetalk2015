var h = require('hyperscript')

module.exports = function () {
  return {
    template: template().outerHTML,
    scope: {
      content: '=content',
      done: '&done'
    }
  }
}

function template () {
  return h('div', [
    h('.pull-right', [
      h('button.btn.btn-primary', {
        'data-ng-click': 'done()'
      }, ['Return'])
    ]),
    h('h2', ['{{content._id}}']),
    h('.well', [
      h('pre', ['{{content.content}}'])
    ]),
    h('button.btn.btn-primary', {
      'data-ng-click': 'done()'
    }, ['Return'])
  ])
}
