import React, { PropTypes } from "react";

import { RouteHandler } from "react-router";

import "matstyle/less/main.less";

let ssoHandlerImported = true;

const App = React.createClass({
  displayName : 'App',

  propTypes: {},

  contextTypes: {
    router: PropTypes.func,
  },

  // mixins : [RouteHandler.State],

  getInitialState() {
    return {
      hasLoaded: false,
    };
  },


  onLoad() {
    // AuthStore.removeChangeListener(this.onLoad);
    this.setState({
      hasLoaded: true,
    });
  },

  render() {
    let key = this.context.router.getCurrentPath();

    if (!ssoHandlerImported) {
      // this.getPathname() is coming from the Router.State mixin, returns /tmc-privacy-policy when you're on
      // the Privacy Policy page defined below
      require('../../lib/ssoHandler');
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
