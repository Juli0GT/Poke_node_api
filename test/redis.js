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

    describe('Pokemon is stored', () => {
      let data;

      before(done => {
        const path = '/pokemon/pikachu';
        const status = 200;
        data = {
          success: true,
          data: {
            abilities: ['ability1', 'ability2'],
          },
        };

        redisFunctions.set({
          path,
          client,
          status,
          data,
        });

        requestedPokemon = redisFunctions.get({
          path,
          client,
        });
        done();
      })

      after(done => {
        client.flushall();
        done();
      })

      it('Should return stored value when pokemon data is stored in cache', (done) => {
        const response = {
          data,
          status: 200,
        };
  
        requestedPokemon.then(result => {
          result.should.eql(response);
        }).finally(done);
      });

    });
  });
});