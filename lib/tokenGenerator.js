var jwt = require('jsonwebtoken');

var privateKey = 'keyboard cat';

function TokenGenerator() {}

TokenGenerator.generateSsoToken = function() {
  return jwt.sign({
    domain: 'https://mobiledevhq.com',
    timestamp: Date.now(),
  }, privateKey, {});
};

module.exports = TokenGenerator;
