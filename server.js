const http = require('http');
const router = require('./router');

var server = http.createServer((request, response) => {

  router.route(request.url, response);
  
  // if (request.url === '/hello') {
  //   response.writeHead(200, {'Content-Type': 'text/html'});
  //   fs.createReadStream('html/hello.html').pipe(response);
  // } else if (request.url === '/goodbye') {
  //   response.writeHead(200, {'Content-Type': 'text/html'});
  //   fs.createReadStream('html/goodbye.html').pipe(response);
  // } else if (request.url === '/') {
  //   response.writeHead(200, {'Content-Type': 'text/html'});
  //   fs.createReadStream('html/index.html').pipe(response);
  // } else {
  //   response.writeHead(404, {'Content-Type': 'text/html'});
  //   fs.createReadStream('html/404.html').pipe(response);
  // }
});


module.exports = server;