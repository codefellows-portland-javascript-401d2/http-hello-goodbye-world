var http = require('http');
var figlet = require('figlet');

const server = http.createServer((req, res) => {
  console.log('request:', req.method, req.url);

  var responseString ='';

  if(req.url === '/' || req.url === '/index'){
    res.writeHead( 200, { 'Content-Type': 'text/plain' });
    responseString = 'hello world';

  } else if (req.url === '/cats'){
    res.writeHead( 200, { 'Content-Type': 'text/plain' });
    responseString = 'meow world';

  } else if (req.url === '/klingon'){
    res.writeHead( 200, { 'Content-Type': 'text/plain' });
    responseString = 'qapla\' world';
  }

  figlet(responseString, (err, data) =>{
    if(err){
      console.log('Oops, something went wrong');
    }
    res.end(data);
  });

});

server.listen(4444);
