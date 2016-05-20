var http = require('http');
var figlet = require('figlet');
var fs = require('fs');
var url = require('url');

module.exports = http.createServer((req, res) => {
  var responseString ='';
  var query = url.parse(req.url).query;

  console.log(query);

  if (req.url === '/' || req.url === '/index'){
    res.writeHead( 200, { 'Content-Type': 'text/plain' });
    responseString = 'meow world';

  } else if (req.url === '/cats'){
    res.writeHead( 200, {'Content-Type': 'text/html'});
    fs.createReadStream('cat.html').pipe(res);


  } else if (req.method === 'post'){
    res.writeHead( 200, {'Content-Type': 'text/plain'});
    fs.createWriteStream('posts.txt').pipe(res);

  } else if (query === /[message=]/){
    res.writeHead(200);
    responseString = 'message recieved';

  } else {
    res.end('these aren\'t the cats you\'re looking for');
  }

  figlet(responseString, (err, data) =>{
    if(err){
      console.log('Oops, something went wrong');
    }
    res.end(data);
  });

});
