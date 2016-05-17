const httpServer = require('./httpServer');
const portNumber = process.argv[2];

httpServer.new(portNumber);
