var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
require('./ProgressBar.less');

module.exports = React.createClass({
  'displayName' : 'ProgressBar',
  'propTypes'   : {
    'fillColor' : React.PropTypes.string,
    'size'      : React.PropTypes.oneOf(['small', 'medium', 'large']),
    'percentage' : function(props, propName) {
      var numVal = Number(props[propName]);

      if (numVal === NaN || numVal < 0 || numVal > 100) {
        return new Error(`${propName} is required and must be number between 0 and 100`);
      }
    }
  },
  'mixins' : [PureRenderMixin],

  'getDefaultProps' : function() {
    return {
      'fillColor' : '',
      'size'      : 'medium'
    };
  },

  'render' : function() {
    var fillStyles = {'width': Math.min(this.props.percentage, 100) + '%'};
    var containerStyles = {};

    switch (this.props.size) {
      case 'small'  :
        containerStyles.height = '1rem';
        break;
      case 'medium' :
        containerStyles.height = '2rem';
        break;
      case 'large' :
        containerStyles.height = '3rem';
        break;
    }

    if (this.props.fillColor) {
      fillStyles.backgroundColor = this.props.fillColor;
    }

    return (
      <div
        style={containerStyles}
        className="m-progress-bar">
        <div
          className="m-progress-bar-fill"
          style={fillStyles}></div>
      </div>
    );
  }
});