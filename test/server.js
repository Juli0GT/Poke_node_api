const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
    

const app = require('../server.js');

chai.use(chaiHttp);

describe('Server', () => {

  describe('/GET/:name pokemon', () => {

    it('should get a pokemon by the given name', (done) => {
      const pokemonName = 'pikachu';
      chai.request(app)
        .get(`/pokemon/${pokemonName}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.success.should.equal(true);
          res.body.should.have.property('data');
          done();
        });
    });
  
    it('should error when requesting a non existing pokemon', (done) => {
      const pokemonName = 'notAPokemon';
      chai.request(app)
        .get(`/pokemon/${pokemonName}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.success.should.equal(false);
          res.body.should.have.property('error');
          res.body.error.should.have.property('message');
          done();
        });
    });

  });

});