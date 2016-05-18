const chai = require('chai');
const chaiHttp = require('chai-http');
const httpServer = require('../http-server');
const expect = chai.expect;

chai.use(chaiHttp);

const newServer = httpServer.new();
const port = 8080;
const baseUrl = 'http://localhost:8080';

describe('HTTP Server', () => {
  before((done) => {
    newServer.listen(port, done);
  });

  it('Get home page with status 400', (done) => {
    chai.request(baseUrl)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('Get hello page', (done) => {
    chai.request(baseUrl)
      .get('/hello')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.html;
        done();
      });
  });

  it('Get goodbye page with one param', (done) => {
    chai.request(baseUrl)
      .get('/goodbye')
      .query({ library: 'cowsay' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.html;
        done();
      });
  });

  it('Post goodbye page with two params', (done) => {
    chai.request(baseUrl)
      .post('/form')
      .send({ text: 'Moo', library: 'cowsay' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.html;
        done();
      });
  });
});
