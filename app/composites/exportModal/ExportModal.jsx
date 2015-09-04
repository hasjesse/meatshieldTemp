var React = require('react');

// Components
var Modal       = require('../../components/modal/Modal');
var DotLoader   = require('../../components/loaders/DotLoader');
var ProgressBar = require('../../components/progress/ProgressBar');
var Select      = require('../../components/select/Select');

// TXL
import Gear from 'txl/icons/icons/Gear';
import Button from 'txl/buttons/Button'

require('./exportModal.less')

module.exports = React.createClass({
  'displayName' : 'MDHQExportModal',
  'propTypes' : {},

  'getInitialState' : function() {
    return {
      'downloadDisabled' : true,
      'showModal'        : false,
      'loading'          : true
    }
  },

  'toggleModal' : function() {
    this.setState({
      'showModal' : !this.state.showModal
    });
  },

  'downloadExport' : function(){
    console.log('download the stuff');
  },

  'render' : function() {
    var optionSelected = function(val){
      console.log(val);
    };

    var selectOptions = [
      { value: 'Hello', label: 'Hello' },
      { value: 'World', label: 'World' },
      { value: 'one', label: 'one' },
      { value: 'two', label: 'two' },
      { value: 'three', label: 'three' },
      { value: 'four', label: 'four' },
      { value: 'five', label: 'five' },
      { value: 'six', label: 'six' },
      { value: 'seven', label: 'seven' },
      { value: 'eight', label: 'eight' },
      { value: 'nine', label: 'nine' }
    ];

    return (
      <div>
        <Button
          importance="primary"
          onClick={this.toggleModal}
          ref="mdhqExportModalBtn">
          Export
        </Button>
        <Modal
          blindClick={this.toggleModal}
          cancelClick={this.toggleModal}
          confirmClick={this.downloadExport}
          confirmDisabled={this.state.downloadDisabled}
          confirmText="Download"
          showModal={this.state.showModal}
          title="Export">

          <div className="m-modal-progress-bar-container">
            <p>We're putting your data together in a downloadable zip file ... hang tight!</p>
            <ProgressBar size="large" percentage={50} fillColor="#3FC7B0"/>
          </div>

          <ul className="m-export-modal-job-container">
            <li className="m-export-modal-job-status">
              <p className="m-export-modal-job-text">Keyword Difficulty</p>
              <div className="m-export-modal-job-loader">
                <DotLoader
                  loading={this.state.loading}/>
              </div>
            </li>
            <li className="m-export-modal-job-status">
              <p className="m-export-modal-job-text">Keyword Relevance</p>
              <div className="m-export-modal-job-loader">
                <DotLoader
                  loading={this.state.loading}/>
              </div>
            </li>
            <li className="m-export-modal-job-status">
              <p className="m-export-modal-job-text">Historically Ranked Keyword</p>
              <div className="m-export-modal-job-loader">
                <DotLoader
                  loading={this.state.loading}/>
              </div>
            </li>
          </ul>

        </Modal>
      </div>
    );
  }
});

// For when we want to add in the form fields
//<div className="m-export-modal-form-container">
//  <div className="m-export-modal-form-select">
//    <label>App:</label>
//    <Select
//      disabled={false}
//      multiSelect={true}
//      noResultsText={'Sorry, there are no results.'}
//      optionSelected={optionSelected}
//      options={selectOptions}
//      placeholder={'Please select an option...'}
//      searchable={true}/>
//  </div>
//
//  <div className="m-export-modal-form-select">
//    <label>Region:</label>
//    <Select
//      disabled={false}
//      multiSelect={true}
//      noResultsText={'Sorry, there are no results.'}
//      optionSelected={optionSelected}
//      options={selectOptions}
//      placeholder={'Please select an option...'}
//      searchable={true}/>
//  </div>
//</div>