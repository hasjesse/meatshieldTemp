import React, { PropTypes } from "react";

import{ RouteHandler } from "react-router";

import "matstyle/less/main.less";

// var ssoHandlerImported = false;

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

    return (
      <div>
        <RouteHandler key={key} />
      </div>
    );
  }
});

export default App;
