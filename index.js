const httpServer = require('./http-server');
const portNumber = process.argv[2];

httpServer.new(portNumber);
