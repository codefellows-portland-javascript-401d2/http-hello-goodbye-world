const fs = require('fs');
const http = require('http');
const url = require('url');
const cowsay = require('cowsay');
const figlet = require('figlet');
const jade = require('jade');

const httpServer = {};

httpServer.convertText = function (formatParam, content) {
  let textObj = {
    textConverted: false,
    textContent: content
  };

  switch (formatParam) {
  case 'cowsay':
    textObj.textConverted = true;
    textObj.textContent = cowsay.say({text: content.toUpperCase()});
    break;
  case 'figlet':
    textObj.textConverted = true;
    textObj.textContent = figlet.textSync(content.toUpperCase());
    break;
  }

  return textObj;
};

httpServer.jadeToHtml = function (filePath, locals) {
  let compliedJadeFile = jade.compileFile(filePath);

  return compliedJadeFile(locals);
};

httpServer.new = function (portNumber = 4000) {
  http.createServer((req, res) => {
    let statusCode = 200;
    let urlParse = url.parse(req.url, true);

    if (req.method === 'GET') {
      let content;
      let jadePath = './templates/page.index.jade';
      let jadeLocals = {
        textConverted: false
      };
      let obj = {};

      switch (urlParse.pathname) {
      case '/farewells':
        obj = httpServer.convertText(urlParse.query.format, 'Goodbye World');
        jadeLocals.pageTitle = 'Farewells';
        jadeLocals.textConverted = obj.textConverted;
        jadeLocals.textContent = obj.textContent;

        break;
      case '/greetings':
        obj = httpServer.convertText(urlParse.query.format, 'Hello World');
        jadeLocals.pageTitle = 'Greetings';
        jadeLocals.textConverted = obj.textConverted;
        jadeLocals.textContent = obj.textContent;

        break;
      default:
        statusCode = 400;
        jadeLocals.pageTitle = 'Page Not Found';
        jadePath = './templates/page.error.jade';

        break;
      }

      content = httpServer.jadeToHtml(jadePath, jadeLocals);

      res.writeHead(statusCode, {
        'content-type': 'text/html'
      });
      res.end(content);
    }
  }).listen(portNumber);
};

module.exports = httpServer;
