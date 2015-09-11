var React = require('react');
var _ = require('lodash');

var MDHQBase, {autobind, NOOP} = require('../../components/base/Base');
var Modal = require('../../components/modal/Modal');

var CopyFromApp = require('./CopyFromApp');
var BulkUpload  = require('./BulkUpload');
var ManualEntry = require('./ManualEntry');

// TXL
var Tabs        = require('txl/tabs/Tabs');
var Button      = require('txl/buttons/Button');

// Actions
var KeywordsActions = require('../../actions/KeywordsActions');

require('./KeywordsModal.less');

module.exports = React.createClass({
  'displayName' : 'MDHQKeywordsModal',
  'propTypes' : {
    'appsData' : React.PropTypes.object
  },

  'getDefaultProps' : function() {
    return {
      'appsData' : {}
    };
  },

  'getInitialState' : function() {
    return {
      'confirmDisabled' : false,
      'filepath'        : '',
      'includeLabels'   : true,
      'manualKeywords'  : '',
      'regionLabels'    : [],
      'replaceStrategy' : 'replace',
      'selectedApp'     : '',
      'selectedRegion'  : '',
      'selectedTab'     : 'manual-entry',
      'showModal'       : false,
    }
  },

  '_handleCheckboxClick' : function(event) {
    this.setState({
      'includeLabels' : !this.state.includeLabels
    });
  },

  '_handleFileSelect' : function(e) {
    this.setState({
      'filepath' : e.target.value
    });
  },

  '_handleRadioClick' : function(e) {
    this.setState({
      'replaceStrategy' : e.value
    });
  },

  '_handleRegionSelect' : function(obj) {
    this.setState({
      'selectedRegion' : obj.value,
    });
  },

  '_handleTabClick' : function(tab) {
    this.setState({
      'selectedTab' : tab.name
    });
  },

  '_handleTextField' : function(obj) {
    this.setState({
      'manualKeywords' : obj.value,
    });
  },

  '_populateRegions' : function(obj) {
    var app = this.props.appsData.appsWithRegions[obj.value];
    var labels = app.regions.map((region) => {
      return { 'label': region.name, 'value': region.iso_code }
    });

    this.setState({
      'selectedApp' : obj.value,
      'regionLabels' : labels
    });
  },

  'submitForm' : function() {
    var inputsByTab = {
      "manual-entry" : [
        "manualKeywords"
      ],
      "bulk-upload" : [
        "filepath"
      ],
      "copy-from-app" : [
        "includeLabels",
        "replaceStrategy",
        "selectedApp",
        "selectedRegion",
      ]
    };

    var relevantInputKeys = inputsByTab[this.state.selectedTab];

    var payload = _.pick(this.state, ...relevantInputKeys);

    KeywordsActions.postKeywordsForm(payload);
  },

  'toggleModal' : function() {
    this.setState({
      'showModal' : !this.state.showModal
    });
  },

  'render' : function() {
    return (
      <div>
        <Button
          variant="accent"
          onClick={this.toggleModal}
          ref="mdhqKeywordsModalBtn"
          size="large">
          Add Keywords
        </Button>

        <Modal
          blindClick={this.toggleModal}
          cancelClick={this.toggleModal}
          confirmClick={this.submitForm}
          confirmDisabled={this.state.confirmDisabled}
          showModal={this.state.showModal}
          tabs={true}
          title="Add Keywords">

          <section className="m-keywords-modal-tabs">
            <Tabs
              onTabClick={(e) => this._handleTabClick(e)}
              selectedName={this.state.selectedTab}>
              <object name="manual-entry" heading="Manual Entry">

                <ManualEntry
                  manualKeywords={this.state.manualKeywords}
                  onChange={(obj) => this._handleTextField(obj)}/>

              </object>
              <object name="bulk-upload" heading="Bulk Upload">

                <BulkUpload
                  filepath={this.state.filepath}
                  onChange={(e) => this._handleFileSelect(e)}/>

              </object>
              <object name="copy-from-app" heading="Copy from App">

                <CopyFromApp
                  appOnChange={(allSelected) => this._populateRegions(allSelected)}
                  appsData={this.props.appsData}
                  checkboxOnChange={(e) => this._handleCheckboxClick(e)}
                  includeLabels={this.state.includeLabels}
                  radioOnChange={(e) => this._handleRadioClick(e)}
                  regionLabels={this.state.regionLabels}
                  regionOnChange={(allSelected) => this._handleRegionSelect(allSelected)}
                  replaceStrategy={this.state.replaceStrategy}
                  selectedApp={this.state.selectedApp}
                  selectedRegion={this.state.selectedRegion}/>
              </object>

            </Tabs>
          </section>
        </Modal>
      </div>
    )
  }
});
