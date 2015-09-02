var React = require('react');
require('./style.less');

module.exports = React.createClass({
  'displayName' : 'MyComponent',

  'render'      : function() {
    return <h1 className="my-component">Just My Component Here!</h1>;
  }
});