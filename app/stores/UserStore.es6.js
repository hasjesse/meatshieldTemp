var Reflux = require('reflux');
var ClientCache = require('../../lib/ClientCache');
var UserActions = require('../actions/UserActions');
var crypto = require('../../lib/cryptofoo');

var UserStore = Reflux.createStore({
  listenables : UserActions,
  init        : function() {
    this.sessionToken = '';
    this.currentContext = {};

    this.errorMessage = '';
  },

  onInit : function(sessionToken) {
    this.sessionToken = sessionToken;
  },

  onInitCompleted : function(contextData) {
    // cacheId resembles this format: accountId_userId
    ClientCache.init(`${_.get(contextData, 'context.id')}_${_.get(contextData, 'context.user_id')}`);
    this.currentContext = contextData;
    heap.identify({handle : crypto.hash('md5', _.get(contextData, 'user.email'))});
    this.emitChange();
  },

  onInitFailed    : function(error) {
    this.errorMessage = error.message;
    this.emitChange(error.message);
  },

  getExposedData : function() {
    return {
      sessionToken : this.sessionToken,
      context      : this.currentContext
    };
  },

  emitChange : function(action) {
    this.trigger(this.getExposedData(), action);
  }

});

module.exports = UserStore;
