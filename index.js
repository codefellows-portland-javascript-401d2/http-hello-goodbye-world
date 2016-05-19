const httpServer = require('./http-server');
const newServer = httpServer.new();

newServer.listen(8080, () => {
  console.log('Opened server on %j', newServer.address());
});
