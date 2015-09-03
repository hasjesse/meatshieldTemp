var Reflux = require('reflux');
var _ = require('lodash');
var RankingsActions = require('../actions/RankingsActions');

var RankingsStore = Reflux.createStore({

  'listenables' : RankingsActions,

  init : function() {
    this.rankingsTableAddTags         = [];
    this.rankingsTableAllRowsSelected = false;
    this.rankingsTableBulkAction      = false;
    this.rankingsTableCurrentPage     = 1;
    this.rankingsTableData            = [];
    this.rankingsTableFilterData      = [];
    this.rankingsTablePageSize        = 20;
    this.rankingsTableSelectedRows    = [];
    this.rankingsTableSelectedTags    = [];
    this.rankingsTableSettings        = [];
    this.rankingsTableTotalPages      = 1;
  },

  onLoadRankingsTableCompleted : function(res) {
    res.forEach((term) => {
      // add checked property
      term.checked = false;

      // add graphed property
      term.graphed = false;

      // sets up labels/tags to work with react select
      // example of new format:
      // { label: 'Top 10', value: 'top_10' }
      term.labels.forEach((label) =>{
        if(label.hasOwnProperty('key')){
          label['label'] = label['key'];
          delete label['key'];
        }
      });

      // Add dynamic tags
      if(term.rank <= 10){
        term.labels.unshift({'label' : 'Top 10', 'value' : 'top_10'});
      }
      if(term.rank > 10 && term.rank <= 20){
        term.labels.unshift({'label' : 'Top 20', 'value' : 'top_20'});
      }
      if(term.rank >= 50){
        term.labels.unshift({'label' : 'Low Rank', 'value' : 'low_rank'});
      }
    });
    // all of the data
    this.rankingsTableData = res;
    // data that changes and is passed thorugh to the page
    this.rankingsTableDataFiltered = res;
    this.setSelectFilters(res);
    // set total pages for pagination
    this.rankingsTableTotalPages = Math.ceil(this.rankingsTableDataFiltered.length/this.rankingsTablePageSize);
    this.emitChange();
  },

  setTableSize : function(values) {
    // set pagination states
    this.rankingsTablePageSize = values.current.size;
    this.rankingsTableTotalPages = Math.ceil(this.rankingsTableDataFiltered.length/this.rankingsTablePageSize);
    this.rankingsTableCurrentPage = values.current.page;
    this.emitChange();
  },

  setSelectFilters : function(terms) {
    let uniqueSearchTerms = [];
    let uniqueLabel  = [];
    terms.forEach((term) => {
      // add search terms to the select auto complete (these are unique)
      if(!_.some(uniqueSearchTerms, {'label' : term.search_term})){
        let param = {};
        // creates label/tag value pair required for the select component
        param.label = term.search_term;
        param.value = term.search_term;
        uniqueSearchTerms.push(param);
      }

      // add labels/tags to select auto complete (these are unique)
      term.labels.forEach((label) => {
        if(!_.some(uniqueLabel, {'label' : label.label})){
          uniqueLabel.push(label);
        }
      });
    });
    // sets the select filter list alpha sorted by label/tag
    this.rankingsTableFilterData = _.sortBy(uniqueSearchTerms.concat(uniqueLabel), 'label');
    this.emitChange();
  },

  onLoadRankingsTableSettingsCompleted : function(res) {
    this.rankingsTableSettings = res;
    this.emitChange();
  },

  onSelectRow : function(row) {
    // find row and check the box
    this.rankingsTableDataFiltered.forEach((item) => {
      if(item.search_term === row.search_term){
        item.checked = !row.checked
      }
    });
    this.setSelectedRows();
    this.setBulkAction();
    this.areAllRowsChecked();
    this.emitChange();
  },

  onSelectAllRows : function(current){
    this.rankingsTableDataFiltered.forEach((item) => {
      item.checked = current;
    });
    this.rankingsTableSelectedRows = this.rankingsTableDataFiltered;
    this.setSelectedRows();
    this.setBulkAction();
    this.areAllRowsChecked();
    this.emitChange();
  },

  setSelectedRows : function() {
    // set what rows are selected and store those rows
    let selectedRows = [];
    this.rankingsTableDataFiltered.forEach((item) => {
      if(item.checked === true){
        selectedRows.push(item);
      }
    });
    this.rankingsTableSelectedRows = selectedRows;
    this.clearAddTags();
    this.emitChange();
  },

  setBulkAction : function() {
    // if any rows are selected turn on bulk action
    if(this.rankingsTableSelectedRows.length === 0){
      this.rankingsTableBulkAction = false;
    } else {
      this.rankingsTableBulkAction = true;
    }
    this.emitChange();
  },

  areAllRowsChecked : function() {
    let dataLength = this.rankingsTableDataFiltered.length;
    let selectedRowLength = this.rankingsTableSelectedRows.length;

    this.rankingsTableAllRowsSelected = dataLength === selectedRowLength && selectedRowLength != 0;
    this.emitChange();
  },

  onSelectTag : function(tag) {
    this.rankingsTableSelectedTags = this.rankingsTableSelectedTags.concat([tag]);
    this.filterTableData();
    this.emitChange();
  },

  onSelectTagDropdown : function(allSelected) {
    // No tags
    if(allSelected.allSelected.length === 0){
      this.rankingsTableSelectedTags = [];
    }
    // selecting/removing out of dropdown
    if(this.rankingsTableSelectedTags.length < allSelected.allSelected.length){
      this.rankingsTableSelectedTags = allSelected.allSelected;
    } else {
      this.rankingsTableSelectedTags = allSelected.allSelected;
    }
    this.filterTableData();
    // update pager total pages
    this.rankingsTableTotalPages = Math.ceil(this.rankingsTableDataFiltered.length/this.rankingsTablePageSize);
    this.emitChange();
  },

  filterTableData : function() {
    let filteredData;
    // Check to see if there are any filters and if so filter data based on current filters
    if(this.rankingsTableSelectedTags.length === 0){
      filteredData = this.rankingsTableData;
    } else {
      filteredData = [];
      this.rankingsTableData.forEach((tableData) => {
        // remove check mark / bulk action when filtering
        tableData.checked = false;
      });
      // Check each report for the selected filters
      this.rankingsTableData.forEach((tableData) => {

        let match = 0;
        this.rankingsTableSelectedTags.forEach((selectedTag) => {
          // if the selected label/tag exists in the search term or in the labels/tags
          if(selectedTag.label === tableData.search_term || _.some(tableData.labels, selectedTag)){
            match++;
          }
        });
        // only add to filtered data if it matches all of the filters
        if(match === this.rankingsTableSelectedTags.length){
          filteredData.push(tableData);
        }
      });
    }
    this.rankingsTableDataFiltered = filteredData;
    this.setSelectedRows();
    this.setBulkAction();
    this.areAllRowsChecked();
    // update pager total pages
    this.rankingsTableTotalPages = Math.ceil(this.rankingsTableDataFiltered.length/this.rankingsTablePageSize);
    this.emitChange();
  },

  onAddTagsToKeywordsCompleted : function(keywords, tags) {
    console.log('add tags store');
  },

  setAddTags : function(allTags) {
    this.rankingsTableAddTags = allTags.allSelected;
    this.emitChange();
  },

  clearAddTags : function() {
    if(this.rankingsTableSelectedRows.length === 0){
      this.rankingsTableAddTags = [];
    }
    this.emitChange();
  },

  onRemoveTagsFromKeywordsCompleted : function() {
    console.log('remove tags store');
  },

  onSettingsChangedCompleted : function(settings) {
    this.rankingsTableSettings = settings;
    this.emitChange();
  },

  emitChange : function(action) {
    this.trigger(this.getExposedData(), action);
  },

  getExposedData : function() {
    return {
      rankingsTableAddTags         : this.rankingsTableAddTags,
      rankingsTableAllRowsSelected : this.rankingsTableAllRowsSelected,
      rankingsTableBulkAction      : this.rankingsTableBulkAction,
      rankingsTableCurrentPage     : this.rankingsTableCurrentPage,
      rankingsTableData            : this.rankingsTableData,
      rankingsTableDataFiltered    : this.rankingsTableDataFiltered,
      rankingsTableFilterData      : this.rankingsTableFilterData,
      rankingsTablePageSize        : this.rankingsTablePageSize,
      rankingsTableSelectedRows    : this.rankingsTableSelectedRows,
      rankingsTableSelectedTags    : this.rankingsTableSelectedTags,
      rankingsTableSettings        : this.rankingsTableSettings,
      rankingsTableTotalPages      : this.rankingsTableTotalPages
    };
  }
});

module.exports = RankingsStore;