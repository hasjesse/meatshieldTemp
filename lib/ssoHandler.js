var UserActions = require('../app/actions/UserActions');
// var Logger = require('lib/logger/logger');

// copied from http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
      results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

var sessionTokenInQueryString = getParameterByName('session_token');
console.log(sessionTokenInQueryString);
var supportInQueryString = getParameterByName('support');


// Logger.info(`Session token used from query string: ${sessionTokenInQueryString}`);

UserActions.init(sessionTokenInQueryString);

module.exports = dontRequireSessionToken => {

  // The following logic is a temporary hack for support that circumvents single sign on.
  // This is temporary until agency login and/or single sign on is properly implemented,
  // but needs to occur since the session/authenticate/get_session_data API call in UserActions
  // is internal only and is currently breaking users
  if (sessionTokenInQueryString) {

    // Logger.info(`Session token used from query string: ${sessionTokenInQueryString}`);

    UserActions.init(sessionTokenInQueryString);
  }

  // } else {

  //   var receiveMessage = event => {
  //     var messageData = event.data;

  //     try {
  //       messageData = JSON.parse(messageData);
  //       console.log(messageData);
  //     } catch(e) {}

  //     if (!_.isObject(messageData) || messageData.sender !== 'tune_sso') {
  //       return;
  //     }

  //     var userMetadata = {};
  //     try {
  //       // expected to have the following keys:
  //       // tmcEnabled: Boolean, type: String, id: Int, user_id: Int, email: String
  //       userMetadata = JSON.parse(
  //         // only gets called once, so not pulling these regular expressions out into variables
  //         (messageData.user_metadata || '')
  //           .replace(/&quot;/g, '"')
  //           .replace(/&gt;/g, '>')
  //           .replace(/&lt;/g, '<')
  //           .replace(/&amp;/g, '&')
  //           .replace(/&#x27;/g, '\'')
  //       );
  //     } catch(e) {}

  //     // if the server shows no session token, not logged in - redirect back to login
  //     if (!messageData.session_token) {
  //       if (dontRequireSessionToken) {
  //         Logger.info(`No session token from Login App, but not requiring the session token`);
  //         window.removeEventListener('message', receiveMessage);
  //         return;
  //       }

  //       window.location = messageData.redirect + window.location.href;
  //     }

  //     Logger.info(`Session token from Login App: ${messageData.session_token}`);

  //     UserActions.init(messageData.session_token, userMetadata);

  //     // stop listening
  //     window.removeEventListener('message', receiveMessage);
  //   };

  //   window.addEventListener('message', receiveMessage);

  // }

};
