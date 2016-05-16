const http = require('http');
const fs = require('fs');
const port = 8000;

var server = http.createServer((request, response) => {
  
  if (request.url === '/hello') {
    response.writeHead(200, {'Content-Type': 'text/html'});
    fs.createReadStream('html/hello.html').pipe(response);
  } else if (request.url === '/goodbye') {
    response.writeHead(200, {'Content-Type': 'text/html'});
    fs.createReadStream('html/goodbye.html').pipe(response);
  } else {
    response.writeHead(200, {'Content-Type': 'text/html'});
    fs.createReadStream('html/index.html').pipe(response);
  }
});

server.listen(port, () => {
  console.log('opened server on %j', server.address());
});