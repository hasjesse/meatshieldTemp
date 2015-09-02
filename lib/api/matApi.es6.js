var _ = require('lodash');

var Request = require('FnServiceLayer/src/api/request');
var UserStore = require('../../app/stores/UserStore');
// var Logger = require('lib/logger/logger');

var TestingHookActions = require('../../app/actions/TestingHookActions');

var EnvConfig = require('../EnvConfig');

var MatApi = new Request({
  template             : EnvConfig.MAT_API_ENDPOINT + '/v2/#{endpoint}?#{params}',
  requestInterceptors  : [
    (conf, params) => {
      if (params.noSessionToken) {
        delete params.noSessionToken;
      } else if (!params.session_token && UserStore.sessionToken) {
        params.session_token = UserStore.sessionToken;
      }

      TestingHookActions.requestStarted();
    }
  ],
  responseInterceptors : [
    res => {
      try {
        res.body = JSON.parse(res.body);
      } catch(e) {}

      return res;
    },
    res => {
      // if request is unauthorized
      if (_.isObject(res.body) && res.body.status_code == 401) {
        // TODO login app doesn't actually retain redirectUrl on the logout path; right now, we can't just
        // redirect to the main login page, because it can return stale session tokens, so we're actually
        // logging the user out
        window.location = `${EnvConfig.LOGIN_APP_URL}/logout?redirectUrl=${window.location.href}`;
      }
      return res;
    },
    (res, metadata) => {
      var shortenedUrl = metadata.url;
      if (metadata.url.indexOf('?') > -1) {
        shortenedUrl = metadata.url.substring(0, metadata.url.indexOf('?'));
      }

      // Logger.log({
      //   message : shortenedUrl,
      //   extra   : {
      //     'URL'           : metadata.url,
      //     'HTTP Response' : res.body
      //   }
      // });

      return res;
    },
    res => {
      TestingHookActions.requestEnded();
      return res;
    }
  ]
});

module.exports = MatApi;
