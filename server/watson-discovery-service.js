const Promise = require('bluebird');
const DiscoveryV1 = require('watson-developer-cloud/discovery/v1');

const discovery = new DiscoveryV1({
  version_date: '2017-08-01'
});

discovery.query = Promise.promisify(discovery.query);

module.exports = discovery;
