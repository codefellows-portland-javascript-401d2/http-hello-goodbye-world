const http = require ( 'http' );
const url = require ( 'url' );

function pageMessages(req, res) {

  //need to check first word of URL
  var pathname = url.parse(req.url).pathname.split('/')[1]; //cleaning up URL and getting first word

  switch (pathname) {
    case '':
      res.writeHead(200, {Content-Type: "text/plain"});
      res.write('Welcome to the home page');
      res.end();
      break;


  }
};
