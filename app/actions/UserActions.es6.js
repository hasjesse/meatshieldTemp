var Reflux = require('reflux');
var _ = require('lodash');
// var Logger = require('lib/logger/logger');

var UserActions = Reflux.createActions({
  init : {children : ['completed', 'failed']}
});

UserActions.init.listen(function(sessionToken, userData={}) {

  var validateAndResolve = userData => {

    if (!userData) {
      return this.failed();
    }

    if (userData.context.type !== 'advertiser') {
      return this.failed({'message' : 'WRONG_CONTEXT'});
    }

    // format the rules to be a little easier to work with
    // instead of an array of objects that have { id, permission_name, level},
    // let's use an object of {permission_name : level, ...}
    userData.permissions = !_.isEmpty(userData.permissions) ? userData.permissions : {};
    var formattedRules = {};
    _.each(userData.permissions.rules, ruleData => {
      formattedRules[ruleData.permission_name] = ruleData.level;
    });
    userData.permissions.rules = formattedRules;

    this.completed(userData);
  };

  // if we get userData, we're just going to trust that it's right.
  // the sessionToken may be stale (still in login app cache, but purged from API cache),
  // if actually stale but login app is out of sync, it'll eventually  401 and send you back to the login app;
  // the common case here is that the sessionToken is not stale
  if (!_.isEmpty(userData) && !_.isUndefined(userData.permissions)) {
    // Logger.info({
    //   message : 'User Metadata loaded from Login App',
    //   extra   : userData
    // });

    return validateAndResolve(userData);
  }

  // requiring here to avoid an unfortunate circular dependency with UserStore
  // circular dependency would cause UserActions to have module.exports = {}
  var MatApi = require('../../lib/api/matApi');

  // we need to pass sessionToken explicitly for this call until sessionToken gets saved into the UserStore
  MatApi.get({endpoint : 'session/authenticate/get_session_data'}, {session_token : sessionToken})
    .then(res => validateAndResolve(res.data))
    .catch(this.failed);
});

module.exports = UserActions;
