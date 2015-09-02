var React      = require('react');
var classnames = require('classnames');

var Icon = require('delphi/icon/Icon');

require('./dotLoader.less');

module.exports = React.createClass({
  'displayName' : 'MDHQDotLoader',
  'propTypes'   : {
    'loading'     : React.PropTypes.bool
  },

  'getDefaultProps' : function(){
    return {
      'loading'     : true
    }
  },

  'render' : function() {
    var dotClasses = classnames(
      'm-loader-dots',
      {
        'm-loader-dots-loading': this.props.loading
      }
    );

    var iconClasses = classnames(
      'm-loader-icon',
      {
        'm-loader-icon-success' : !this.props.loading
      }
    );

    return (
      <div className="m-dot-loader">
        <div className={dotClasses}></div>
        <div className={dotClasses}></div>
        <div className={dotClasses}></div>
        <div className={dotClasses}></div>
        <div className={dotClasses}></div>
        <div className={iconClasses}>
          <Icon icon="check" />
        </div>
      </div>
    );
  }
});