var React = require('react');
var MDHQBase, {autobind, NOOP} = require('../base/Base');

var FileInput = require('../inputs/FileInput');

module.exports = React.createClass({
  'displayName' : 'MDHQKeywordsBulkUpload',
  'propTypes' : {
    'filepath' : React.PropTypes.string,
    'onChange' : React.PropTypes.func,
  },

  'getDefaultProps' : function() {
    return {
      'filepath' : '',
      'onChange' : NOOP,
    };
  },

  'render' : function() {
    return (
      <div className="m-keywords-modal-tab-content">
        <div>
          <p>Quickly upload your keywords</p>
          <p>
            Download our <a href="#">template</a> to get the proper format.
            Upload the CSV when you have filled it out.
          </p>
        </div>
        <div>
          <FileInput
            label="Upload CSV"
            accept=".csv"
            onChange={this.props.onChange}
            filepath={this.props.filepath}/>
        </div>
      </div>
    );
  }
});
