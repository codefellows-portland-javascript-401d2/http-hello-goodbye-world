const server = require('./server');
const port = 8000;

server.listen(port, () => {
  console.log('started http server on %j', server.address());
});