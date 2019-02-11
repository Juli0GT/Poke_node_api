const redisFunctions = require('../helpers/redis.js');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const should = chai.should();
const redis = require('redis-mock');

chai.use(chaiAsPromised);


describe('Redis', () => {

  describe('Redis getter', () => {
    let client;
    let requestedPokemon;

    before(done => {
      client = redis.createClient();
      done();
    })

    describe('Pokemon is not stored', () => {
      before(done => {
        const path = '/pokemon/pikachu';
        requestedPokemon = redisFunctions.get({
          path,
          client,
        });    
        done();
      })

      it('Should return false when pokemon data is not stored in cache', (done) => {
        requestedPokemon.then(result => {
          result.should.equal(false);
        }).finally(done);
      });

      it('Should reject promise resolved as true when pokemon not stored in cache', (done) => {
        const promise = requestedPokemon.then(result => {
          result.should.equal(true);
        }).finally(done);
  
        promise.should.be.rejectedWith(Error);
      });

    });
  });
});