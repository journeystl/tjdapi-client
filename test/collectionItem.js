var tjdapi = require('../index')
  , nock = require('nock')
  , should = require('should')
  , mocks = require('./mocks')
  , dotenv = require('dotenv');

dotenv.load();

describe('tjdapi', function() {
  var api
    , apiUrl = process.env.TJDAPI_URL || 'http://foo.bar'
    , request
    , test_id;

  beforeEach(function(done) {
    api = new tjdapi({apiUrl: apiUrl, apikey: process.env.TJDAPI_key || 'letmein'});
    // Initialize nock for mocks.
    request = nock(apiUrl);
    done();
  });

  describe('postCollectionItem', function() {
    it('should create a collection item', function(done) {
        var object = {
          required_string: 'bar',
        };

      request
        .post('/_test')
        .reply(200, mocks.collectionItem.post);

      api.postCollectionItem('_test', object, function(err, response, body) {
        (err === null).should.be.true;
        body.should.have.property('_id');
        done();
      });
    });
  });

  describe('putCollectionItem', function() {
    it('should put a collection item', function(done) {
      var test_id = '5429bf6208bf4cd821823128'
        , object = {
          foo: 'bar',
          _id: '5429bf6208bf4cd821823128',
        };

      request
        .put('/_test/' + test_id)
        .reply(200, mocks.collectionItem.put);

      api.putCollectionItem('_test', test_id, object, function(err, response, body) {
        (err === null).should.be.true;
        body.should.have.property('foo', 'bar');
        done();
      });
    });
  });

  describe('deleteCollectionItem', function() {
    it('should delete a collection item', function(done) {
      var test_id = '5429bf6208bf4cd821823128';

      request
        .delete('/_test/' + test_id)
        .reply(200, mocks.collectionItem.del);

      api.deleteCollectionItem('_test', test_id, function(err, response, body) {
        (err === null).should.be.true;
        body.should.equal('okay');
        done();
      });
    });
  });

  describe('getCollectionItemExternal', function() {
    it('should get a collection item by external source', function(done) {
      var test_id = '5429bf6208bf4cd821823128'
        , object = {
          foo: 'bar',
          _id: '5429bf6208bf4cd821823128',
        };

      request
        .get('/_test/_external/test/' + test_id)
        .reply(200, mocks.collectionItem.get);

      api.getCollectionItemExternal('_test', 'test', test_id, function(err, response, body) {
        (err === null).should.be.true;
        body.should.have.property('label', 'Tower Grove');
        done();
      });
    });
  });

  describe('putCollectionItemExternal', function() {
    it('should put a collection item by external source', function(done) {
      var test_id = '5429bf6208bf4cd821823128'
        , object = {
          foo: 'bar',
          _id: '5429bf6208bf4cd821823128',
        };

      request
        .put('/_test/_external/test/' + test_id)
        .reply(200, mocks.collectionItem.put);

      api.putCollectionItemExternal('_test', 'test', test_id, object, function(err, response, body) {
        (err === null).should.be.true;
        body.should.have.property('foo', 'bar');
        done();
      });
    });
  });

  describe('deleteCollectionItemExternal', function() {
    it('should delete a collection item by external source', function(done) {
      var test_id = '5429bf6208bf4cd821823128';

      request
        .delete('/_test/_external/test/' + test_id)
        .reply(200, mocks.collectionItem.del);

      api.deleteCollectionItemExternal('_test', 'test', test_id, function(err, response, body) {
        (err === null).should.be.true;
        body.should.equal('okay');
        done();
      });
    });
  });
});