var React = require('react');
var MyComponent = require('mdhq-components/myComponent/MyComponent');

var Button = require('delphi/buttons/Button');

module.exports = React.createClass({
 'displayName' : 'MyComponent.demo',
 'propTypes' : {},

 'render' : function() {
  return (
    <div className="myComponentContainer">
      <Button importance="primary-alt">Delphi BTN</Button>
      <MyComponent />
    </div>
  );
 }
});