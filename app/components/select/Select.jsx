var React = require('react/addons');
var ReactSelect = require('react-select');
var classnames = require('classnames');

require('./select.less');

module.exports = React.createClass({
  'displayName': 'MDHQSelect',
  'propTypes'   : {
    'className'     : React.PropTypes.string,
    'clearable'     : React.PropTypes.bool,
    'disabled'      : React.PropTypes.bool,
    'multiSelect'   : React.PropTypes.bool,
    'name'          : React.PropTypes.string,
    'noResultsText' : React.PropTypes.string,
    'options'       : React.PropTypes.arrayOf(
      React.PropTypes.shape({
        'label' : React.PropTypes.string,
        'value' : React.PropTypes.string
      })
    ).isRequired,
    'optionSelected' : React.PropTypes.func,
    'placeholder'    : React.PropTypes.string,
    'searchable'     : React.PropTypes.bool,
    'value'          : React.PropTypes.any
  },

  'getDefaultProps' : function() {
    return {
      'clearable'      : false,
      'disabled'       : false,
      'multiSelect'    : false,
      'noResultsText'  : 'No results',
      'optionSelected' : Function.prototype, /* noop */
      'placeholder'    : 'Select ...',
      'searchable'     : false
    };
  },

  'render': function () {
    var containerClasses = classnames('m-select-container', this.props.className);
    var {multiSelect, ...other} = this.props;

    return (
      <div className={containerClasses}>
        <ReactSelect
          {...other}
          multi={multiSelect}
          onChange={ (value, allSelected) => { this.props.optionSelected({value, allSelected})} }/>
      </div>
    );
  }
});
