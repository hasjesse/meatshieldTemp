var React = require('react');

module.exports = React.createClass({
  'displayName' : 'PagePicker',
  'propTypes'   : {
    'currentPage' : React.PropTypes.number.isRequired,
    'totalPages'  : React.PropTypes.number.isRequired,
    'updatePage'  : React.PropTypes.func.isRequired
  },

  'getInitialState' : function() {
    return {'isEditable' : false};
  },

  '_toInputBox' : function() {
    this.setState({'isEditable' : true});
  },

  '_toText' : function(e) {
    if (e.key === 'Enter') {
      this.props.updatePage({'page': e.target.value});
      this.setState({'isEditable' : false});
    }
  },

  'render' : function() {
    if (!this.state.isEditable) {
      return (
        <div
          className="t-pager-current-page"
          onClick={this._toInputBox}>
          {this.props.currentPage}
        </div>
      );
    } else {
      return (
        <input
          className="t-pager-current-page-picker"
          defaultValue={this.props.currentPage}
          max={this.props.totalPages}
          min="1"
          onKeyDown={this._toText}
          type="number" />
      );
    }

  }
});