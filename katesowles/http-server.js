const http = require('http');
const fs = require('fs');

var server = http.createServer(function(request, response) {
  console.log('request: ', request.method, request.url);

  if (request.url === '/' || request.url === '/index.html') { // if url points to naken domain OR domain.com/index.html
    response.writeHead(200, {'Content-Type': 'text/html'}); // will interpret the file as html
    fs.createReadStream('index.html').pipe(response);
  }
  else if (request.url === '/about.html') {  // if url points to domain.com/about.html
    response.writeHead(200, {'Content-Type': 'text/html'}); // will interpret the file as html
    fs.createReadStream('about.html').pipe(response);
  }
  else {  // for any other urls
    response.writeHead(200, {'Content-Type': 'text/plain'}); // will interpret the file as plain text even if it's laid out as HTML
    response.end('Hello World\n');
  }
});

server.listen(4400);
console.log('opened server on %j', server.address());
