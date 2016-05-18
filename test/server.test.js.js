const assert = require('chai').assert;
const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const server = require('../server');
const router = require('../router');

chai.use(chaiHttp);

describe('running http server', () => {
  
  it('server responds with index.html on GET /', (done) => {
    chai.request(server)
        .get('/')
        .end(function(err, response) {
          fs.readFile('./html/index.html', (err, data) => {
            if (err) throw err;
            var localText = data;
            assert.equal(localText, response.text);
            done();
          });
        });
  });
  
  
  
});
