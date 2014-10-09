require('fs').readdirSync(__dirname + '/').forEach(function(file) {
  var models = [];
  if (file.match(/.+\.js/g) !== null && file !== 'index.js' && file.substr(0,1) !== '_') {
    var name = file.replace('.js', '');
    exports[name] = require('./' + file);
  }
})