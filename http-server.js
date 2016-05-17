const http = require('http');
const url = require('url');
const cowsay = require('cowsay');
const figlet = require('figlet');

const httpServer = {};

httpServer.formatContent = function (urlParse, content) {
  switch (urlParse.query.format) {
  case 'cowsay':
    content = '<pre>' +
      cowsay.say({text: content.toUpperCase()}) +
      '</pre>';
    break;
  case 'figlet':
    content = '<pre>' +
      figlet.textSync(content.toUpperCase()) +
      '</pre>';
    break;
  }

  return content;
};

httpServer.new = function (portNumber = 4000) {
  http.createServer((req, res) => {
    if (req.method === 'GET') {
      let urlParse = url.parse(req.url, true);
      let bodyContent;
      let urlBase = `http://localhost:${portNumber}`;
      let urlHello = `${urlBase}/hello`;
      let urlGoodbye = `${urlBase}/goodbye`;

      switch (urlParse.pathname) {
      case '/hello':
        bodyContent = httpServer.formatContent(urlParse, 'Hello World');
        break;
      case '/goodbye':
        bodyContent = httpServer.formatContent(urlParse, 'Goodbye World');
        break;
      default:
        bodyContent = '<p>In your browswer, visit ' +
          `<a href="${urlHello}">${urlHello}</a> or ` +
          `<a href="${urlGoodbye}">${urlGoodbye}</a>.</p>`;
        break;
      }

      res.writeHead(200, { 'content-type': 'text/html' });
      res.end(bodyContent);
    }
  }).listen(portNumber);
};

module.exports = httpServer;
