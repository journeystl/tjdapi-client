var tjdapi = require('../index')
  , nock = require('nock')
  , should = require('should')
  , mocks = require('./mocks')
  , dotenv = require('dotenv');

dotenv.load();

describe('tjdapi.getCollectionItem()', function() {
  var api
    , apiUrl = process.env.TJDAPI_URL || 'http://foo.bar'
    , request;

  beforeEach(function(done) {
    api = new tjdapi({apiUrl: apiUrl, apikey: 'letmein'});
    // Initialize nock for mocks.
    request = nock(apiUrl);
    done();
  });

  it('should get a collection item', function(done) {
    var church_id = '5429bf6208bf4cd821823128';
    request
      .get('/church/' + church_id)
      .reply(200, mocks.collectionItem.get);

    api.getCollectionItem('church', church_id , function(err, response, body) {
      (err === null).should.be.okay;
      body.should.have.property('label', 'Tower Grove');
      done();
    });
  });

  it('should get a collection item with a defined option', function(done) {
    var church_id = '5429bf6208bf4cd821823128'
      , options = {fields: {label: 1, email: 1}};
    request
      .get('/church/' + church_id + '?fields%5Blabel%5D=1&fields%5Bemail%5D=1')
      .reply(200, mocks.collectionItem.getWithFields);

    api.getCollectionItem('church', church_id , options, function(err, response, body) {
      (err === null).should.be.okay;
      body.should.have.eql({
        _id: church_id,
        email: 'infoTG@thejourney.org',
        label: 'Tower Grove',
      });
      done();
    });
  });
});