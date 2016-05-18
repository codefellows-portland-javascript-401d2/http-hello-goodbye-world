const fs = require('fs');

const router = { 
  paths : [  // Add path resources here as they are created and give resources the same name 
    '/hello', // ^^ (i.e. goodbye.html coincides with /goodbye) ^^
    '/goodbye',
    '/index',
    '/404',
    '/godzilla',
    '/form'
  ],
  route: function(path, res, type) {
    if (!type) type = 'text/html';
    var status_code = 200;
    if (path === '/') {
      path = '/index';
    } else if (router.paths.indexOf(path) === -1) {
      path = '/404';
      status_code = 404;
    }
    res.writeHead(status_code, {'Content-Type': type});
    fs.createReadStream(`html${path}.html`).pipe(res);
  }
};

module.exports = router;