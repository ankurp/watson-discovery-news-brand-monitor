require('isomorphic-fetch');
const queryBuilder = require('./query-builder');
const discovery = require('./watson-discovery-service');

function createServer() {
  const server = require('./express');

  server.get('/monitor/api/search', (req, res) => {
    const { query } = req.query;

    discovery.query(queryBuilder.search({ query }))
      .then(response => res.json(response))
      .catch(error => {
        console.error(error);
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

module.exports = createServer;