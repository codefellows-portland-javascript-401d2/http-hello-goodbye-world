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
      let statusCode = 200;
      let urlParse = url.parse(req.url, true);
      let bodyContent;
      let urlBase = `http://localhost:${portNumber}`;
      let urlGreetings = `${urlBase}/greetings`;
      let urlFarewells = `${urlBase}/farewells`;

      switch (urlParse.pathname) {
      case '/farewells':
        bodyContent = httpServer.formatContent(urlParse, 'Goodbye World');
        break;
      case '/greetings':
        bodyContent = httpServer.formatContent(urlParse, 'Hello World');
        break;
      default:
        statusCode = 400;
        bodyContent = '<p>In your browswer, visit ' +
          `<a href="${urlGreetings}">${urlGreetings}</a> or ` +
          `<a href="${urlFarewells}">${urlFarewells}</a>.</p>`;
        break;
      }

      res.writeHead(statusCode, {
        'content-type': 'text/html'
      });
      res.end(bodyContent);
    }
  }).listen(portNumber);
};

module.exports = httpServer;
