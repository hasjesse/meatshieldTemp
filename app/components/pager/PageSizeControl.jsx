var React = require('react/addons');
var _ = require('lodash');

// Delphi TODO: Remove this once we have a TXL or MDHQ version
var ButtonGroup = require('delphi/buttons/ButtonGroup');

// TXL
var Button = require('txl/buttons/Button');

module.exports = React.createClass({
  'displayName' : 'PageSizeControl',
  'propTypes'   : {
    'onChange'        : React.PropTypes.func.isRequired,
    'pageSizes'       : React.PropTypes.arrayOf(React.PropTypes.number),
    'pageSizeMessage' : React.PropTypes.node,
    'currentSize'     : function(props, propName) {
      if (props.pageSizes.indexOf(props[propName]) < 0) {
        return new Error('Current page size is invalid.');
      }
    }
  },

  'getDefaultProps' : function() {
    return {
      'currentSize' : 20,
      'pageSizes'   : [20, 50, 100]
    };
  },

  '_handelChange' : function(size) {
    this.props.onChange({
      'current'  : size,
      'previous' : this.props.currentSize
    });
  },

  'render' : function() {
    return (
      <div className="t-pager-select-page-total-container">
        <ButtonGroup>
        {this.props.pageSizes.map((size, index) => {
          return (
            <Button
              key={index}
              onClick={() => this._handelChange(size)}
              size="standard"
              variant={this.props.currentSize === size ? 'muted' : 'plain'}>
              {size}
            </Button>
          );
        })}
        </ButtonGroup>
        {!_.isUndefined(this.props.pageSizeMessage) &&
          <div className='t-pager-page-size-message'>
           {this.props.pageSizeMessage}
          </div>
        }
      </div>
    );
  }
});