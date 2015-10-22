var palmetto = require('palmettoflow-nodejs')
var ee = palmetto()

var fetchConfig = require('zero-config')
var config = fetchConfig(__dirname, { dcValue: 'us-east-1'})

require('./repos')({})(ee)
require('./readmes')({})(ee)

