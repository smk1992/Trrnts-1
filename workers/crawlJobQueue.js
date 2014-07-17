//See https://github.com/learnboost/kue
var kue = require('kue'),
    redis = require('../redis');

//Instantiate a crawljob queue qith kue which will help us handle multiple crawler jobs...
//running more than a few at a time tends to explode the computers.
var crawlJobQueue = module.exports = exports = kue.createQueue({
  redis: {
    createClientFactory: function () {
      return redis();
    }
  }
});

process.once('SIGTERM', function (sig) {
  queue.shutdown(function (err) {
    console.log('Kue is shut down.', err || '');
    process.exit(0);
  }, 5000);
});
