var React = require('react');

var MDHQBase, {autobind, NOOP} = require('../../components/base/Base');

var TextField   = require('txl/input-fields/TextField');

module.exports = React.createClass({
  'displayName' : 'MDHQKeywordsManualEntry',
  'propTypes' : {
    manualKeywords : React.PropTypes.string,
    onChange       : React.PropTypes.func,
  },

  'getDefaultProps' : function() {
    return {
      manualKeywords : '',
      onChange       : NOOP,
    };
  },

  'render' : function() {
    return (
      <div className="m-keywords-modal-tab-content">
        <TextField
          placeholder="Enter new keywords to track. Ex: 'Tune, Mobile, Optimization'"
          secondaryText="Keywords should be comma-separated."
          multiLine={true}
          validationState="base"
          value={this.props.manualKeywords}
          onChange={this.props.onChange}/>
      </div>
    )
  }
});
