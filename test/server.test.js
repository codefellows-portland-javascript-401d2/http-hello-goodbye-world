const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

describe('http server',() => {
  const request = chai.request(server);

  it('root sends back index response', done => {
    request
      .get('/')
      .end((err,res) => {
        assert.equal(res.statusCode, 200);
        assert.ok(res.text);
        done();
      });
  });

  it('/christmas shows days until christmas', done => {
    request
      .get('/christmas')
      .end((err,res) => {
        assert.equal(res.statusCode, 200);
        assert(/There are [0-9]{1,3} days until Christmas!/.test(res.text));
        done();
      });
  });

  it('/form sends text/html data', done => {
    request
      .get('/form')
      .end((err,res) => {
        assert.equal(res.statusCode, 200);
        assert.propertyVal(res.header,'content-type','text/html');
        done();
      });
  });

  it('POST data received and processed', done => {
    request
      .post('/')
      .field('birthday','1966-12-31')
      .end((err,res) => {
        assert.equal(res.statusCode, 201);
        assert(/You are [0-9]{1,6} years old\./.test(res.text));
        done();
      });
  });
});
