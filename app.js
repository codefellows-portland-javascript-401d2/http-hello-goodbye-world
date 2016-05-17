const http = require('http');
const cowsay = require('cowsay');
const querystring = require('querystring');


var server = http.createServer( (req, res) =>{

  // console.log(req.url);

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

  // On url...
  // On Method...
  // On query...
  // Header??
  // Body content??


  res.writeHead(200, {'Content-Type': 'text/plain'});
  var cowText;

  if(req.url === '/bye'){
    cowText = cowsay.say({text: 'goodbye world'});
  }else{
    cowText = cowsay.say({text: 'hello world'});
  }

  res.end(cowText);
});

module.exports = server;
