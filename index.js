
var request = require('request')
  , extend = require('extend');

var tjdapi = function(options) {
  var self = this;

  options = options || {};
  if(!options.hasOwnProperty('apiUrl') || !options.apiUrl) {
    throw new Error('"apiUrl" is required for tjdapi');
  }

  self.apiUrl = options.apiUrl;
  if(self.apiUrl.slice(-1) !== '/') {
    self.apiUrl += '/';
  }
  // request.debug = true;
  self.baseRequest = request.defaults({
    headers: {
      'x-apikey': options.apikey || null,
      'Content-type': 'application/json',
      'Accept': 'application/json',
    },
    json: true,
  })
}

tjdapi.prototype.getCollection = function(collection, options, cb, results) {
  var self = this;

  if(typeof options === 'function') {
    cb = options;
    options = {};
  }

  if(options === undefined) {
    options = {};
  }

  if(results === undefined) {
    results = [];
  }

  if(!options.hasOwnProperty('paginate')) {
    options.paginate = true;
  }

  var defaults = {
    query: options.query || {},
    fields: options.fields || {},
    limit: options.limit || null,
    offset: options.offset || 0,
    sort: options.sort || {},
  }
  self.baseRequest.get({
    url: self.apiUrl + collection,
    qs: defaults,
  }, function(err, response, body) {
    if(err) {
      throw new Error(err);
    }

    // Add any previous results to the new set.
    body.results = results.concat(body.results);
    if(body.hasOwnProperty('num_found') && body.hasOwnProperty('limit') && body.num_found > body.limit && body.offset <= body.limit && options.paginate === false) {
      // On to the next page.
      defaults.offset = Number(defaults.offset) + Number(body.limit);
      // Update options with defaults.
      extend(options, defaults);
      return self.getCollection(collection, options, cb, body.results);
    } else {
      // All done, return the results.
      cb(err, response, body);
    }
  });
}

tjdapi.prototype.getCollectionItem = function(collection, id, options, cb) {
  var self = this;

  if(typeof options === 'function') {
    cb = options;
    options = {};
  }

  self.baseRequest.get({
    url: self.apiUrl + collection + '/' + id,
    qs: options,
  }, cb);
}

module.exports = tjdapi;