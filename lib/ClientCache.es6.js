var _ = require('lodash');

var localStorageEnabled = true;

var ClientCache = {

  init : function(userId) {
    this.userId = userId;
    this.userInfo = {};

    try {
      var test = `test${Date.now()}`;
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
    } catch(e) {
      localStorageEnabled = false;
    }

    if (!localStorageEnabled) {
      return;
    }

    try {
      this.userInfo = JSON.parse(localStorage[userId]);
      // but only if it hasn't "expired"
      if (Date(this.userInfo.expiration) < Date.now()) {
        this.userInfo = {};
      }
    } catch(e) {}
  },

  get : function(key) {
    var value = this.userInfo[key];

    try {
      value = JSON.parse(value);
    } catch(e) {}

    return value;
  },

  set : function(key, value) {
    this.userInfo[key] = _.isObject(value) ? JSON.stringify(value) : value;
    if (!this.userInfo.expiration) {
      this.userInfo.expiration = Date.now() + (1000 * 60 * 60);
    }

    if (localStorageEnabled) {
      localStorage[this.userId] = JSON.stringify(this.userInfo);
    }
  }

};

module.exports = ClientCache;
