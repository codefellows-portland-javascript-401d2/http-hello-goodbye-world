var http = require('http');
var figlet = require('figlet');
var fs = require('fs');

module.exports = http.createServer((req, res) => {
  var responseString ='';

  if (req.url === '/' || req.url === '/index'){
    res.writeHead( 200, { 'Content-Type': 'text/plain' });
    responseString = 'meow world';

  } else if (req.method === 'GET'){
    res.writeHead( 200, {'Content-Type': 'html'});
    fs.createReadStream('cat.html').pipe(res);

  } else {
    res.statusCode(400);
    res.end('these aren\'t the cats you\'re looking for');
  }

  //TODO querystring # prints meow world dynamic number of times

  // else if (req.url === '/klingon'){
  //   res.writeHead( 200, { 'Content-Type': 'text/plain' });
  //   responseString = 'qapla\' world';
  // }

  figlet(responseString, (err, data) =>{
    if(err){
      console.log('Oops, something went wrong');
    }
    res.end(data);
  });

});
