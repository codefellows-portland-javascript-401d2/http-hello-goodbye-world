const assert = require('chai').assert;
const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const server = require('../server');
const router = require('../router');

chai.use(chaiHttp);

describe('running http server', () => {
  
  it(' responds with index.html on GET /', (done) => {
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
  
  it('routes to secret godzilla page with correct query string', (done) => {
    chai.request(server)
        .get('/godzilla?godzilla=gojira')
        .end(function(err, response) {
          fs.readFile('./html/godzilla2.html', (err, data) => {
            if (err) throw err;
            var localPage = data;
            assert.equal(localPage, response.text);
            done();
          });
        });  
  });
  
  it('receives post request with test name and test color', (done) => {
    var testName = 'DON';
    var testColor = 'blue';
    chai.request(server)
        .post('/form')
        .send({name: testName, color: testColor})
        .end((err, response) => {
          if (err) throw err;
          fs.readFile('posts.txt', (err, data) => {
            assert.equal(data.toString(),`{"name":"${testName}","color":"${testColor}"}`);  
            done();
          });
        });
        
  });
  
  it('routes to 404 page when path is no recognized', (done) => {
    chai.request(server)
        .get('/random/path')
        .end((err, response) => {
          fs.readFile('./html/404.html', (err, data) => {
            assert.equal(data, response.text);
            done();
          });
        })
  });
  
  
  
});
