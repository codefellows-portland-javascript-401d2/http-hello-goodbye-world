const http = require('http');
const cowsay = require('cowsay');


var server = http.createServer( (req, res) =>{

  res.writeHead(200, {'Content-Type': 'text/plain'});
  var cowText;

  if(req.url === '/bye'){
    cowText = cowsay.say({text: 'goodbye world'});
  }else{
    cowText = cowsay.say({text: 'hello world'});
  }

  res.end(cowText);

});

server.listen(4444);
