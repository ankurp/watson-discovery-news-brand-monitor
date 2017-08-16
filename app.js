require('dotenv').config({ silent: true });

const createServer = require('./server');
const port = process.env.PORT || 3000;

const app = createServer();
app.listen(port, () => {
  console.log('Server running on port: %d', port);
});
