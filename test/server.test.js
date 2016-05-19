const server = require( '../server');
const chai = require( 'chai' );
const chaiHttp = require ( 'chai-http' );
const assert = chai.assert;

chai.use( chaiHttp );

describe( 'http server', () => {

  const request = chai.request (server);

  it( 'sends back index response', done => {
    request
      .get('/')
      .end( (err,res ) => {
        assert.equal( res.statusCode, 200);
        assert.ok( res.text );
        done();
      });
  });

  it( 'sends back secret response', done => {
    request
      .get('/secret')
      .end( (err,res ) => {
        assert.equal( res.statusCode, 200);
        assert.ok( res.text );
        done();
      });
  });

  it( 'sends back error response', done => {
    request
      .get('/kittykat')
      .end( (err,res ) => {
        assert.equal( res.statusCode, 400);
        assert.ok( res.text );
        done();
      });
  });

});
