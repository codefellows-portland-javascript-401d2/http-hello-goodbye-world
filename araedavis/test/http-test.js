const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;

chai.use(chaiHttp);

describe('http server ok', () =>{
  const request = chai.request(server);

  it('returns index response', done =>{
    request
      .get('/')
      .end((err, res) =>{
        assert.equal(res.statusCode, 200);
        assert.ok(res.text);
        done();
      });
  });

  it('returns cat html', done =>{
    request
      .get('')
      .end((err, res) => {
        assert.equal(res.statusCode, 200);
        assert.ok(res.text);
        done();
      });
  });

  it('posts message contents in new file', done =>{
    request
      .post('/cats')
      .end((err, res) => {
        assert.equal(res.statusCode, 200);
        assert.ok(res.text);
        done();
      });
  });

  it('returns err msg', done =>{
    request
      .get('/upload')
      .end((err, res)=>{
        assert.equal(res.statusCode, 404);
        assert.equal(res.text, 'Error: these aren\'t the cats you\'re looking for');
        done();
      });
  });
});
