const http = require ( 'http' );
const url = require ( 'url' );

const server = http.createServer( (req, res ) => {
  console.log( 'request:', req.method, req.url);

  //need to check first word of URL
  var pathname = url.parse(req.url).pathname.split('/')[1]; //cleaning up URL and getting first word

  switch (pathname) {
  case '':
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Welcome to the home page');
    res.end();
    break;
  case 'secret':
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Oh-oh. You have found the super secret page. This message will self-destruct in 3 - 2 - 1 -  BOOM!');
    res.end();
    break;
  }
});

server.listen ( 4444, () => {
  console.log('Server opened on Port 4444');
});
