var React = require('react');

var PagerControl = require('./PagerControl');
var PageSizeControl = require('./PageSizeControl');

require('./PagerStyles.less');

module.exports = React.createClass({
  'displayName' : 'Pager',
  'propTypes'   : {
    'onChange'        : React.PropTypes.func.isRequired,
    'totalPages'      : React.PropTypes.number.isRequired,
    'currentPage'     : React.PropTypes.number,
    'currentSize'     : React.PropTypes.number,
    'pageSizes'       : React.PropTypes.arrayOf(React.PropTypes.number),
    'pageSizeMessage' : React.PropTypes.node
  },

  '_onChange' : function(type, obj) {

    var current = obj.current;

    var previousValues = {
      'page' : this.props.currentPage,
      'size' : this.props.currentSize
    };

    var updatedValues = {
      'page' : 1,
      'size' : this.props.currentSize
    };

    if (type === 'size') {
      updatedValues.size = current;
    } else if (type === 'page') {
      updatedValues.page = current;
    }

    this.props.onChange({
      'current'  : updatedValues,
      'previous' : previousValues
    });
  },

  'render' : function() {
    return (
      <div className="m-pager-container">
        <PageSizeControl
          currentSize={this.props.currentSize}
          onChange={(obj) => this._onChange('size', obj)}
          pageSizes={this.props.pageSizes}
          pageSizeMessage={this.props.pageSizeMessage}/>
        <PagerControl
          currentPage={this.props.currentPage}
          onChange={(obj) => this._onChange('page', obj)}
          totalPages={this.props.totalPages} />
      </div>
    );
  }
});
