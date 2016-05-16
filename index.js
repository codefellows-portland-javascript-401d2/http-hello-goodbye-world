const server = require('./server');
const portNumber = process.argv[2];

server.newServer(portNumber);
