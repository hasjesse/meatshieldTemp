import React, { PropTypes } from "react";

import { RouteHandler } from "react-router";

import "matstyle/less/main.less";

import UserActions from '../actions/UserActions';

let ssoHandlerImported = false;


function getParameterByName(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

const App = React.createClass({
  displayName : 'App',

  propTypes: {},

  contextTypes: {
    router: PropTypes.func,
  },

  mixins : [RouteHandler.State],

  getInitialState() {
    return {
      hasLoaded: false,
    };
  },

  onLoad() {
    this.setState({
      hasLoaded: true,
    });
  },

  render() {
    let key = this.context.router.getCurrentPath();

    if (!ssoHandlerImported) {
      var sessionTokenInQueryString = getParameterByName('session_token');
      var supportInQueryString = getParameterByName('support');
      if (sessionTokenInQueryString && supportInQueryString) {

        UserActions.init(sessionTokenInQueryString);

      } else {

        var receiveMessage = event => {
          var messageData = event.data;

          try {
            messageData = JSON.parse(messageData);
          } catch(e) {}

          if (!_.isObject(messageData) || messageData.sender !== 'tune_sso') {
            return;
          }

          var userMetadata = {};
          try {
            // expected to have the following keys:
            // tmcEnabled: Boolean, type: String, id: Int, user_id: Int, email: String
            userMetadata = JSON.parse(
              // only gets called once, so not pulling these regular expressions out into variables
              (messageData.user_metadata || '')
                .replace(/&quot;/g, '"')
                .replace(/&gt;/g, '>')
                .replace(/&lt;/g, '<')
                .replace(/&amp;/g, '&')
                .replace(/&#x27;/g, '\'')
            );
          } catch(e) {}

          // if the server shows no session token, not logged in - redirect back to login
          if (!messageData.session_token) {
            window.location = messageData.redirect + window.location.href;
          }

          UserActions.init(messageData.session_token, userMetadata);

          // stop listening
          window.removeEventListener('message', receiveMessage);
        };

        window.addEventListener('message', receiveMessage);

      }
      ssoHandlerImported = true;
    }

    return (
      <div>
        <RouteHandler key={key} />
      </div>
    );
  }
});

export default App;
