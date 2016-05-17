const http = require('http');
const url = require('url');
const m = require('moment');

const server = http.createServer((req,res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});

  res.write('Hello world!\n');

  if (url.parse(req.url, true).pathname == '/christmas') {
    const christmas = m('12252016','MMDDYYYY');
    const now = m();
    const days = christmas.diff(now,'days');
    res.write(`There are ${days} days until Christmas!`);
  }
  res.end('\n');
});
server.listen(process.argv[2] || 3000);
