var palmetto = require('palmettoflow-nodejs')
var ee = palmetto()

module.exports = function (newEvent, cb) {
  var requestTimedOut = false
  var to = setTimeout(function () {
    requestTimedOut = true
    cb({message: 'Request Timed out'})
  }, 4000)

  ee.on(newEvent.from, function (event) {
    clearTimeout(to)
    if (!requestTimedOut) {
      cb(null, event)
    }
  })

  ee.emit('send', newEvent)
}
