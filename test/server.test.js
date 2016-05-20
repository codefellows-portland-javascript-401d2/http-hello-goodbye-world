const server = require( '../server');
const chai = require( 'chai' );
const chaiHttp = require ( 'chai-http' );
const assert = chai.assert;

chai.use( chaiHttp );

describe( 'http server', () => {

  const request = chai.request (server);
  var date = new Date();

  it( 'sends back index response', done => {
    request
      .get('/')
      .end( (err,res ) => {
        assert.equal( res.statusCode, 200);
        assert.equal( res.text, 'Welcome to the home page');
        assert.ok( res.text );
        done();
      });
  });

  it( 'sends back secret response', done => {
    request
      .get('/secret')
      .end( (err,res ) => {
        assert.equal( res.statusCode, 200);
        assert.equal( res.text, 'Oh-oh. You have found the super secret page. This message will self-destruct in 3 - 2 - 1 -  BOOM!');
        assert.ok( res.text );
        done();
      });
  });

  var pattern = /^Here's your super random number for the day: [0-9]+! Enjoy!/;

  it( 'sends back random number', done => {
    request
      .get('/random')
      .end( (err,res ) => {
        assert.equal( res.statusCode, 200);
        assert.isTrue(pattern.test(res.text), 'response text did not match!');
        assert.ok( res.text );
        done();
      });
  });

  it( 'sends back date', done => {
    request
      .get('/date')
      .end( (err,res ) => {
        assert.equal( res.statusCode, 200);
        assert.equal( res.text, date);
        assert.ok( res.text );
        done();
      });
  });

  it( 'sends back error response', done => {
    request
      .get('/kittykat')
      .end( (err,res ) => {
        assert.equal( res.statusCode, 400);
        assert.equal( res.text, 'ERROR 400 - Your request was bad and you should feel bad!');
        assert.ok( res.text );
        done();
      });
  });



});
