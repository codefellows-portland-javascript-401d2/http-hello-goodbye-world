const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;

chai.use(chaiHttp);

describe('http server', () =>{

  const request = chai.request(app);

  it('typing \'/form\' will return 405 error to user', done =>{
    request
    .get('/form')
    .end((err,res) =>{
      assert.equal(res.statusCode, 405);
      done();
    });
  });

  it('selecting a form option returns a cow with approriate message', done =>{
    request
    .post('/form')
    .send('cow=holstein')
    .end((err,res) =>{
      assert.isOk((/Moooooooo/.test(res.text)));
      done();
    });
  });

  it('writing the cow type as url path will return the appropriate cow', done =>{
    request
    .get('/jersey')
    .end((err,res) =>{
      assert.isOk((/Farmer John is my buddy/.test(res.text)));
      done();
    });
  });

  it('adding a query string with a key talk returns the query value in the cow\'s talk bubble', done =>{
    request
    .get('/swiss?talk=tokyoidaho')
    .end((err,res) =>{
      assert.isOk((/tokyoidaho/.test(res.text)));
      done();
    });
  });

  it('unregonized paths display a valid default page', done =>{
    request
    .get('/unrecognized')
    .end((err,res) =>{
      assert.equal(res.statusCode, 200);
      done();
    });
  });
  
});
