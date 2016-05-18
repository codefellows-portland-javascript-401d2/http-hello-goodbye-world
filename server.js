const http = require ( 'http' );
const url = require ( 'url' );
const fs = require ( 'fs' );

const server = http.createServer( (req, res ) => {
  if (req.method === 'GET') {

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
    case 'random':
      var random = function randomNumber(min,max)
      {
        return Math.floor(Math.random()*(max-min+1)+min);
      };
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write('Here\'s your super random number for the day: ' + random(1,1000) + '!' + ' Enjoy!');
      res.end();
      break;
    case 'date':
      var date = new Date().toString();
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(date);
      res.end();
      break;
    default:
      res.statuscode = 400;
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write('ERROR 400 - Your request was bad and you should feel bad!');
      res.end();
    }
  }

});


module.exports = server;
