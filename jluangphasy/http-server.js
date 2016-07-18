const fs = require('fs');
const http = require('http');
const url = require('url');
const cowsay = require('cowsay');
const figlet = require('figlet');
const jade = require('jade');

const httpServer = {};

httpServer.convertText = (formatParam, content) => {
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

httpServer.jadeToHtml = (filePath, locals) => {
  let compliedJadeFile = jade.compileFile(filePath);

  return compliedJadeFile(locals);
};

httpServer.new = () => {
  return http.createServer((req, res) => {
    let statusCode = 200;
    let urlParse = url.parse(req.url, true);
    let content;
    let jadePath = './templates/page.index.jade';
    let jadeLocals = {
      textConverted: false
    };
    let obj = {};

    if (req.method === 'GET') {
      switch (urlParse.pathname) {
      case '/goodbye':
        obj = httpServer.convertText(urlParse.query.library, 'Goodbye World');
        jadeLocals.pageTitle = 'Goodbye World';
        jadeLocals.textConverted = obj.textConverted;
        jadeLocals.textContent = obj.textContent;

        break;
      case '/hello':
        obj = httpServer.convertText(urlParse.query.library, 'Hello World');
        jadeLocals.pageTitle = 'Hello World';
        jadeLocals.textConverted = obj.textConverted;
        jadeLocals.textContent = obj.textContent;

        break;
      case '/form':
        jadeLocals.pageTitle = 'Form';
        jadePath = './templates/page.form.jade';

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
    } else if (req.method === 'POST' && urlParse.pathname === '/form') {
      let postUrl = 'http://localhost:8080/form?';

      req.on('data', chunk => {
        postUrl += chunk.toString();
      });

      req.on('end', () => {
        urlParse = url.parse(postUrl, true);

        obj = httpServer.convertText(urlParse.query.library, urlParse.query.text);
        jadeLocals.pageTitle = urlParse.query.text;
        jadeLocals.textConverted = obj.textConverted;
        jadeLocals.textContent = obj.textContent;

        content = httpServer.jadeToHtml(jadePath, jadeLocals);

        res.writeHead(statusCode, {
          'content-type': 'text/html'
        });
        res.end(content);
      });
    }
  });
};

module.exports = httpServer;
