const http = require('http');
const fs = require('fs');
const url = require('url');
const queryStr = require('querystring');
const router = require('./router');

var server = http.createServer((request, response) => {
  
  const thisURL = url.parse(request.url, true);
  const thisPath = thisURL.pathname;
  const thisQuery = thisURL.query;
  if (request.method === 'GET') {
    router.route(thisPath, response);
  } else if (request.method === 'POST') {
    request.pipe(fs.createWriteStream('posts.txt'));
    response.end('Got it! Thanks');
    // setTimeout(() => {
    //   history.back();
    // }, 2000);
  } else {
    response.statusCode = 400;
    response.end('GET or POST only!');
  }
});

module.exports = server;