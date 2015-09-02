var Reflux = require('reflux');

var TestingHookActions = Reflux.createActions({
  requestStarted : {},
  requestEnded   : {},
  saveId         : {}
});

module.exports = TestingHookActions;
