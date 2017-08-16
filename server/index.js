require('isomorphic-fetch');
const queryBuilder = require('./query-builder');
const discovery = require('./watson-discovery-service');

/*eslint no-unused-vars: ["error", {"argsIgnorePattern": "response"}]*/
const WatsonNewsServer = new Promise((resolve, reject) => {
  // getInvironments as sanity check to ensure creds are valid
  discovery.getEnvironments({})
    .then(response => {
      // environment and collection ids are always the same for Watson News
      const environmentId = discovery.environmentId;
      const collectionId = discovery.collectionId;
      queryBuilder.setEnvironmentId(environmentId);
      queryBuilder.setCollectionId(collectionId);
      resolve(createServer());
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.error(error);
      reject(error);
    });
});

function createServer() {
  const server = require('./express');

  server.get('/monitor/api/search', (req, res) => {
    const { query } = req.query;

    discovery.query(queryBuilder.search({ query }))
      .then(response => res.json(response))
      .catch(error => {
        if (error.message === 'Number of free queries per month exceeded') {
          res.status(429).json(error);
        } else {
          res.status(error.code).json(error);
        }
      });
  });

  server.get('/*', function(req, res) {
    res.render('index', {});
  });

  return server;
}

module.exports = WatsonNewsServer;