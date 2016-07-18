const http = require('http');
const url = require('url');
const m = require('moment');
const fs = require('fs');

const server = http.createServer((req,res) => {
  if (req.method === 'GET') {
    var resource = url.parse(req.url, true).pathname;
    console.log(`Request received for ${resource}`);
    switch (resource) {
    case '/':{
      req.on('error', err => {
        res.write(err);
      });
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write('Hello world!\n');
      res.end('\n');
      break;
    }
    case '/christmas':{
      res.writeHead(200, {'Content-Type': 'text/plain'});
      const christmas = m('12-25-2016','MM-DD-YYYY');
      const now = m();
      const days = christmas.diff(now,'days');
      res.write(`There are ${days} days until Christmas!`);
      res.end('\n');
      break;
    }
    case '/form':{
      res.writeHead(200, {'Content-Type': 'text/html'});
      fs.createReadStream('./form.html').pipe(res);
      break;
    }
    default: {
      res.statuscode = 400;
      res.end(`Sorry, ${resource} is not a valid endpoint.`);
    }
    }
  } else if (req.method === 'POST') {
    var body='';
    req.on('data', (chunk) => body += chunk);
    req.on('end', () => {
      const inDate = body.split('=')[1];
      res.writeHead(201, {'Content-Type': 'text/plain'});
      const birthday = m(inDate,'YYYY-MM-DD');
      const now = m();
      const years = now.diff(birthday,'years');
      res.write(`You are ${years} years old.`);
      res.end('\n');
    });
  }

});


module.exports = server;
