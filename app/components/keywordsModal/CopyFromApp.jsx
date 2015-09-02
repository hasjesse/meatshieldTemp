var React = require('react');
var MDHQBase, {autobind, NOOP} = require('../base/Base');

var Select      = require('../select/Select');
var Checkbox    = require('../inputs/Checkbox');
var RadioButton = require('../inputs/RadioButton');

require('./KeywordsModal.less')

module.exports = React.createClass({
  'displayName' : 'MDHQKeywordsCopyFromApp',
  'propTypes' : {
    'appOnChange'      : React.PropTypes.func,
    'appsData'         : React.PropTypes.obj,
    'checkboxOnChange' : React.PropTypes.func,
    'includeLabels'    : React.PropTypes.bool,
    'radioOnChange'    : React.PropTypes.func,
    'regionLabels'     : React.PropTypes.array,
    'regionOnChange'   : React.PropTypes.func,
    'replaceStrategy'  : React.PropTypes.string,
    'selectedApp'      : React.PropTypes.string,
    'selectedRegion'   : React.PropTypes.string,
  },

  'getDefaultProps' : function() {
    return {
      'appOnChange'      : NOOP,
      'appsData'         : {},
      'checkboxOnChange' : NOOP,
      'includeLabels'    : true,
      'radioOnChange'    : NOOP,
      'regionLabels'     : [],
      'regionOnChange'   : NOOP,
      'replaceStrategy'  : 'replace',
      'selectedApp'      : '',
      'selectedRegion'   : '',
    };
  },

  '_radioButtonsHtml' : function() {
    var radioButtons = [
      {
        checked: true,
        label: "Yes, replace all current keywords",
        name: "Replace Keywords",
        value: "replace"
      },
      {
        checked: false,
        label: "No, merge with current keywords",
        name: "Merge Keywords",
        value: "merge"
      }
    ];

    return radioButtons.map((item, index) => {
      return(
        <div className="m-keywords-modal-radio-button">
          <RadioButton
              key={index}
              name={item.name}
              label={item.label}
              onChange={this.props.radioOnChange}
              checked={this.props.replaceStrategy == item.value}
              value={item.value}/>
        </div>
      );
    });
  },

  'render' : function() {
    return (
      <div className="m-keywords-modal-tab-content">
        <p>Duplicate keywords from:</p>
        <div className="m-keywords-modal-form-select-row">
          <div className="m-keywords-modal-select">
            <Select
              disabled={false}
              multiSelect={false}
              noResultsText={'Sorry, there are no results.'}
              placeholder={'Please select an app...'}
              searchable={true}
              options={this.props.appsData.appLabels}
              optionSelected={(v, s) => this.props.appOnChange(v, s)}
              value={this.props.selectedApp}/>
          </div>
          <div className="m-keywords-modal-select">
            <Select
              disabled={false}
              multiSelect={false}
              noResultsText={'Sorry, there are no results.'}
              placeholder={'Please select a region...'}
              searchable={true}
              options={this.props.regionLabels}
              optionSelected={(v, s) => this.props.regionOnChange(v, s)}
              value={this.props.selectedRegion}/>
          </div>
        </div>
        <div className="m-keywords-modal-labels-checkbox">
          <Checkbox
            checked={this.props.includeLabels}
            label="Include keyword labels"
            name="keyword-labels-checkbox"
            onChange={this.props.checkboxOnChange}/>
        </div>

        <p>Replace existing keywords?</p>
        <div className="m-keywords-modal-replace">
          {this._radioButtonsHtml()}
        </div>
      </div>
    )
  }
});
