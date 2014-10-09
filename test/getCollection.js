var tjdapi = require('../index')
  , nock = require('nock')
  , should = require('should')
  , mocks = require('./mocks')
  , dotenv = require('dotenv');

dotenv.load();

describe('tjdapi.getCollection()', function() {
  var api
    , apiUrl = process.env.TJDAPI_URL || 'http://foo.bar'
    , request;

  beforeEach(function(done) {
    api = new tjdapi({apiUrl: apiUrl, apikey: 'letmein'});
    // Initialize nock for mocks.
    request = nock(apiUrl);

    done();
  });

  it('should return empty result set.', function(done) {
    request
      .get('/church?limit=&offset=0')
      .reply(200, mocks.getCollectionChurch.empty);

    api.getCollection('church', function(err, response, body) {
      (err === null).should.be.okay;
      body.should.have.property('num_found', 0);
      body.should.have.property('results', []);
      done();
    });
  });

  it('should return a "single result" set.', function(done) {
    request
      .get('/church?limit=1&offset=0')
      .reply(200, mocks.getCollectionChurch.one);
    api.getCollection('church', {limit: 1}, function(err, response, body) {
      (err === null).should.be.okay;
      body.should.have.property('num_found', 1);
      body.should.have.property('results');
      body.results.length.should.equal(1);
      done();
    });
  });

  it('should return a "many result" set (paginated.', function(done) {
    request
      .get('/church?limit=50&offset=0')
      .reply(200, mocks.getCollectionChurch.many)
    api.getCollection('church', {limit: 50}, function(err, response, body) {
      (err === null).should.be.okay;
      body.should.have.property('num_found', 2);
      body.should.have.property('results');
      body.results.length.should.equal(2);
      done();
    });
  });

  it('should return a "many more result" set (not paginated).', function(done) {
    request
      .get('/church?limit=2&offset=0')
      .reply(200, mocks.getCollectionChurch.manyMoreOne)
      .get('/church?limit=2&offset=2')
      .reply(200, mocks.getCollectionChurch.manyMoreTwo)
      .get('/church?limit=2&offset=4')
      .reply(200, mocks.getCollectionChurch.manyMoreThree)

    api.getCollection('church', {limit: 2, paginate: false}, function(err, response, body) {
      (err === null).should.be.okay;
      body.should.have.property('num_found', 6);
      body.should.have.property('results');
      body.results.length.should.equal(6);
      done();
    });
  });

})