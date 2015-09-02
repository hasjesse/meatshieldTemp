var Logger = require('lib/logger/logger');

// copied from http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
// also, this same code is in ssoHandler. could consider consolidating into a lib file
function getParameterByName(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
      results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

window.ENV_CONFIG.EXPERIMENTAL = getParameterByName('experimental');

Logger.info({
  message : 'Active Config Variables',
  extra   : window.ENV_CONFIG
});

module.exports = window.ENV_CONFIG;
