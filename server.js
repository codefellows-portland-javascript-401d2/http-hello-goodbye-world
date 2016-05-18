const http = require('http');
const url = require('url');
const queryStr = require('querystring');
const router = require('./router');

var server = http.createServer((request, response) => {
  
  const thisURL = url.parse(request.url, true);
  const thisPath = thisURL.pathname;
  const thisQuery = thisURL.query;
  router.route(thisPath, response);
  // response.end('on it');
  
});

module.exports = server;