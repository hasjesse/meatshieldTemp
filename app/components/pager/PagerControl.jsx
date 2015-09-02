var React = require('react/addons');

var IconButton = require('txl/buttons/IconButton');
var {ArrowRight, ArrowLeft} = require('txl/icons/Icons');

var PagePicker = require('./PagePicker');


module.exports = React.createClass({
  'displayName' : 'PagerControl',
  'propTypes'   : {
    'onChange'    : React.PropTypes.func.isRequired,
    'totalPages'  : React.PropTypes.number.isRequired,
    'currentPage' : React.PropTypes.number
  },

  'getDefaultProps' : function() {
    return {'currentPage' : 1};
  },

  '_updatePage' : function(obj) {
    // input type "number" catches non-numeric inputs, but
    // they still get passed in as strings, which breaks propTypes
    // validation. Bound-checking done for clicking arrows.
    var page = parseInt(obj.page, 10);
    if (page >= 1 && page <= this.props.totalPages) {
      this.props.onChange({
        'current'  : page,
        'previous' : this.props.currentPage
      });
    }
  },

  'render' : function() {
    return (
      <div className="m-pager-scroller-container">
        <div className="m-pager-page-picker">
          <span>Page&nbsp;</span>
          <PagePicker
            currentPage={this.props.currentPage}
            totalPages={this.props.totalPages}
            updatePage={this._updatePage} />
          <span>&nbsp;of&nbsp;{this.props.totalPages}</span>
        </div>
        <div
          className="m-pager-navigation-container m-pager-navigation-container-left"
          onClick={() => this._updatePage({'page' : this.props.currentPage - 1})}>
          <div className="m-pager-navigation-decrement">
            <IconButton
              disabled={this.props.currentPage <= 1}
              variant="muted"
              icon={ArrowLeft}/>
          </div>
        </div>
        <div
          className="m-pager-navigation-container"
          onClick={() => this._updatePage({'page' : this.props.currentPage + 1})}>
          <div className="m-pager-navigation-increment">
            <IconButton
              disabled={this.props.currentPage >= this.props.totalPages}
              variant="muted"
              icon={ArrowRight}/>
          </div>
        </div>
      </div>
    );
  }
});