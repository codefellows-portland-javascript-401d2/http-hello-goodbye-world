const http = require('http');
const fs = require('fs');
const cowsay = require('cowsay');
const querystring = require('querystring');
const cows = require('./cows');

var server = http.createServer( (req, res) =>{

  var path = req.url;
  var method = req.method;
  var queryObject = Object.create(null);

  // Get Query if it exists
  var urlArray = req.url.split('?');
  if (urlArray.length > 1){
    queryObject = querystring.parse(urlArray[1]);
    // Truncate path to exclude query
    path = urlArray[0];
  }
  // Save truncated path without slash
  var pathNoSlash = path.slice(1);
  var cowText;
  var cowType = cows[pathNoSlash];

  if(path === '/form'){
    if(method === 'POST'){

      var messageBody = '';
      req.on('data', chunk =>{
        messageBody += chunk.toString();
      });

      req.on('end', ()=>{
        cowType = cows[messageBody.slice(4)];
        renderCow(res, cowType, cowType.talk, queryObject);
      });

    }else{  // Attempted to access '/form' with GET, responds with error message
      res.writeHead(405, {'Content-Type': 'text/plain'});
      cowText = cowsay.say({text: '405 Error'});
      cowText += `\n You entered the url path: ${path}. \nYou have ventured off the pasture.`;
      res.end(cowText);
    }
  }

  if(cowType){
    renderCow(res, cowType, cowText, queryObject);
  }else{
    // Send HTML form
    fs.createReadStream('./index.html').pipe(res);
  }
});

function renderCow(res, cowType, cowText, queryObject){
  res.writeHead(200, {'Content-Type': 'text/plain'});
  cowText = `${cowType.name} cows say\n`;
  var cowWordBubble = queryObject.talk || cowType.talk;
  cowText += cowsay.say({text: cowWordBubble});
  res.end(cowText);
}

module.exports = server;
