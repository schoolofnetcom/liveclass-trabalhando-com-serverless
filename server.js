const sls = require('serverless-http');
const app = require('./lib');

module.exports.start = sls(app);