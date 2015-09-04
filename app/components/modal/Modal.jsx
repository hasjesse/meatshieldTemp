var React      = require('react');
var classnames = require('classnames');
var _          = require('lodash');

// TXL
var Button = require('txl/buttons/Button');

require('./modal.less');

module.exports = React.createClass({
  'displayName' : 'MDHQModal',
  'propTypes'   : {
    'blindClick'      : React.PropTypes.func,
    'cancelText'      : React.PropTypes.string,
    'cancelClick'     : React.PropTypes.func,
    'confirmClick'    : React.PropTypes.func,
    'confirmDisabled' : React.PropTypes.bool,
    'confirmText'     : React.PropTypes.string,
    'showModal'       : React.PropTypes.bool,
    'title'           : React.PropTypes.node
  },

  'getDefaultProps' : function() {
    return {
      'blindClick'      : _.noop(),
      'cancelText'      : 'Cancel',
      'cancelClick'     : _.noop(),
      'confirmClick'    : _.noop(),
      'confirmDisabled' : false,
      'confirmText'     : 'Confirm',
      'showModal'       : false,
      'title'           : ''
    }
  },

  'render' : function() {
    var modalHTML;
    if(this.props.showModal){
      var modalHTML = (
        <div className="m-modal-container">
          <div className="m-modal-blind" onClick={this.props.blindClick}></div>
          <div className="m-modal">
            <div className="m-modal-title-container">
              {this.props.title &&
              <h2 className="m-modal-title">{this.props.title}</h2>
              }
            </div>
            <div className="m-modal-content">
              {this.props.children}
            </div>
            <div className="m-modal-footer-container">
              <Button
                disabled={this.props.confirmDisabled}
                onClick={this.props.confirmClick}
                size="large"
                variant="accent">
                {this.props.confirmText}
              </Button>
              <Button
                onClick={this.props.cancelClick}
                size="large"
                variant="muted">
                {this.props.cancelText}
              </Button>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="m-modal-overall">
        {modalHTML}
      </div>
    );
  }
});