const http = require('http');
const fs = require('fs');
const cowsay = require('cowsay');
const querystring = require('querystring');
const cows = require('./cows');



var server = http.createServer( (req, res) =>{

  var path = req.url;
  var method = req.method;
  var queryObject;

  // Get Query if it exists
  var urlArray = req.url.split('?');
  if (urlArray.length > 1){
    queryObject = querystring.parse(urlArray[1]);
    // Truncate path to exclude query
    path = urlArray[0];
  }

  // Get last item in path
  var pathLastObject = path.slice(1);
  var pathArray = path.split('/');
  if (pathArray.length > 1){
    pathLastObject = pathArray[pathArray.length - 1];
  }

  var cowText;
  var cowType = cows[pathLastObject];

  if(cowType){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    cowText = `${cowType.name} cows say\n`;
    cowText += cowsay.say({text: cowType.talk});
    res.end(cowText);
  }else{
    console.log('writing html');
    fs.createReadStream('./index.html').pipe(res);
  }

});

module.exports = server;
