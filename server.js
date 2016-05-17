const http = require('http');
const url = require('url');
const m = require('moment');
const fs = require('fs');

const server = http.createServer((req,res) => {
  if (req.method === 'GET') {
    var resource = url.parse(req.url, true).pathname;
    switch (resource) {
    case '/':{
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write('Hello world!\n');
      break;
    }
    case '/christmas':{
      const christmas = m('12252016','MMDDYYYY');
      const now = m();
      const days = christmas.diff(now,'days');
      res.write(`There are ${days} days until Christmas!`);
      break;
    }
    case '/form':{
      res.writeHead(200, {'Content-Type': 'text/html'});
      fs.createReadStream('./form.html').pipe(res);
      break;
    }
    default: {
      res.statuscode = 400;
      res.end('sorry charlie');
    }
    }
  } else if (req.method === 'POST') {
    var body='';
    req.on('data', (chunk) => body += chunk);
    req.on('end', () => {
      const inDate = body.split('=')[1];
      res.writeHead(200, {'Content-Type': 'text/plain'});
      const birthday = m(inDate,'YYYY-MM-DD');
      const now = m();
      const years = now.diff(birthday,'years');
      res.write(`You are ${years} years old.`);
      res.end('\n');
    });
  }
  // res.end('\n');
});
server.listen(process.argv[2] || 3000);
