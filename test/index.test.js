const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
// const superagent = require('superagent');
// const http = require('http');
const assert = chai.assert;
chai.use(chaiHttp);

describe('http server', () =>{

  const request = chai.request(app);

  it('does something or other', done =>{
    request
    .get('/')
    .end((err,res) =>{  // res.status code, res.text
      assert.equal(res.statusCode, 200);
      done();
    });
  });

});
