var http = require('http');
var figlet = require('figlet');
var fs = require('fs');

module.exports = http.createServer((req, res) => {
  var responseString ='';
  var path = req.url;

  if (path === '/' || path === '/index'){
    res.writeHead( 200, { 'Content-Type': 'text/plain' });
    responseString = 'meow world';

  } else if (path === '/cats'){
    res.writeHead( 200, {'Content-Type': 'text/html'});
    fs.createReadStream('cat.html').pipe(res);

  } else if (req.method === 'POST'){
    res.writeHead( 200, {'Content-Type': 'text/plain'});
    req.pipe(fs.createWriteStream('posts.txt'));
    res.writeHead(302, {Location: '/thanks'});

  } else if (path === '/thanks'){
    res.writeHead( 200, { 'Content-Type': 'text/plain' });
    responseString = 'thanks!';
  } else {
    res.writeHead( 404, { 'Content-Type': 'text/plain' });
    res.end('Error: these aren\'t the cats you\'re looking for');
  }

  figlet(responseString, (err, data) =>{
    if(err){
      console.log('Oops, something went wrong');
    }
    res.end(data);
  });

});
