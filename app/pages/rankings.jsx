import React from 'react';
import Radium from 'radium';
import Reflux from 'reflux';

import MDHQBase, {autobind, NOOP} from '../components/base/Base';
import {gridUnits as gu, combineStyles, colors} from '../components/base/styleHelpers';

// Components
import DropdownButton from '../components/buttons/DropdownButton';
import DateRangePicker from '../components/dateRangePicker/DateRangePicker';
import Select from '../components/select/Select';
import Pager from '../components/pager/Pager';

// Composites
import KeywordsModal from '../composites/keywordsModal/KeywordsModal';
import RankingsTable from '../composites/rankingsTable/RankingsTable';
import RankingsTableSettingsModal from '../composites/rankingsSettingsModal/RankingsSettingsModal'

// Delphi
import TMCNavigation from 'delphi/TMC/TMCNavigation';

// TXL
import {Gear} from 'txl/icons/Icons';
import Button from 'txl/buttons/Button'
import IconButton from 'txl/buttons/IconButton'

// Actions
import RankingsActions from '../actions/RankingsActions';
import AppNavigationActions from '../actions/AppNavigationActions';

// Stores
import RankingsStore from '../stores/RankingsStore';
import AppNavigationStore from '../stores/AppNavigationStore';


module.exports = Radium(React.createClass({
  displayName : 'MDHQRankingsPage',
  mixins      : [
    Reflux.connect(RankingsStore, 'rankingsData'),
    Reflux.connect(AppNavigationStore, 'appsData')
  ],

  getInitialState : function () {
    return {
      appsData: AppNavigationStore.getExposedData(),
      rankingsData : RankingsStore.getExposedData(),
      selectedTags : [],
    };
  },

  componentDidMount : function() {
    RankingsActions.loadRankingsTableSettings();
    AppNavigationActions.loadAppsWithRegions();
    RankingsActions.loadRankingsTable();
    RankingsActions.loadRankingsTableFilters();
  },

  tableAddTags : function() {
    if(this.state.rankingsData.rankingsTableAddTags.length > 0){
      RankingsActions.addTagsToKeywords(this.state.rankingsData.rankingsTableSelectedRows,this.state.rankingsData.rankingsTableAddTags)
    }
  },

  render : function() {
    // Suggested tags for the add tags select
    let suggestedTags = [
      {label: 'Suggested Tags:', value: 'Suggested Tags:', disabled : true},
      {label: 'Branded', value: 'branded'},
      {label: 'Competitor', value: 'competitor'},
      {label: 'Deleted', value: 'deleted'},
      {label: 'Head Term', value: 'head_term'},
      {label: 'Live', value: 'live'},
      {label: 'Old', value: 'old'},
      {label: 'Phrase', value: 'phrase'},
      {label: 'Title', value: 'title'}
    ];
    // TMC header links
    let productLinks = [
      {
        'name' : 'Mobile App Tracking',
        'url'  : `https://login.mobileapptracking.com?redirectUrl=https://platform.mobileapptracking.com/handler/authentication/loginViaSessionToken`
      }
    ];
    // Show filters or add tags
    let tableSelectHTML = (
      <Select
        disabled={false}
        multiSelect={true}
        noResultsText={'Sorry, there are no results.'}
        optionSelected={(allSelected) => RankingsActions.selectTagDropdown(allSelected)}
        options={this.state.rankingsData.rankingsTableFilterData}
        placeholder={'Search'}
        searchable={true}
        value={this.state.rankingsData.rankingsTableSelectedTags}/>
    );
    if(this.state.rankingsData.rankingsTableBulkAction){
      tableSelectHTML = (
        <div>
          <span style={STYLES.tableAddTagsCount}>
            {this.state.rankingsData.rankingsTableSelectedRows.length} items selected
          </span>
          <div style={STYLES.tableAddTagsContainer}>
            <div style={STYLES.tableAddTagsSelect}>
              <Select
                allowCreate={true}
                disabled={false}
                multiSelect={true}
                options={suggestedTags}
                optionSelected={(allTags) => RankingsActions.setAddTags(allTags)}
                placeholder={'Add Tags'}
                searchable={true}
                value={this.state.rankingsData.rankingsTableAddTags}/>
            </div>
            <Button
              disabled={this.state.rankingsData.rankingsTableAddTags.length === 0}
              size="standard"
              variant="muted"
              onClick={this.tableAddTags}>
              Add Tags
            </Button>
            <a
              onClick={() => RankingsActions.removeTagsFromKeywords(this.state.rankingsData.rankingsTableSelectedRows)}
              style={STYLES.tableRemoveTags}>
              Remove custom tags
            </a>
          </div>
        </div>
      );
    }
    // Show settings or Stop Tracking
    let tableButtonHtml = (
      <RankingsTableSettingsModal
        tableSettings={this.state.rankingsData.rankingsTableSettings}
        settingChanged={(settings) => RankingsActions.settingsChanged(settings)}/>
    );
    if(this.state.rankingsData.rankingsTableBulkAction){
      tableButtonHtml = (
        <Button
          size="standard"
          variant="muted"
          onClick={()=> RankingsActions.stopTrackingKeywords(this.state.rankingsData.rankingsTableSelectedRows)}>
          Stop Tracking
        </Button>
      );
    }

    return (
      <div data-component="RankingsPage">
        <TMCNavigation
          productLinks = {productLinks}
          onLogout={NOOP}/>
        <div style={STYLES.pageContainer}>

          <div style={STYLES.navContainer}>
            <h2>Nav Area</h2>
          </div>

          <div style={STYLES.contentContainer}>

            <div style={STYLES.pageHeadingContainer}>
              <div style={STYLES.pageTitleContainer}>
                <h1 style={STYLES.pageTitle}>Top Charts and Keywords</h1>
              </div>
              <div style={STYLES.headerButtons}>
                <KeywordsModal
                  appsData={this.state.appsData} />
              </div>
            </div>

            <div style={STYLES.subHeaderContainer}>
              <h2>Performance Trends</h2>
              <div style={STYLES.subHeaderActions}>
                <div style={STYLES.graphDateRange}>
                  <DateRangePicker
                    applyDate={(date) => console.log('apply date: ', date)}/>
                </div>
                <div style={STYLES.savedView}>
                  <DropdownButton
                    size="standard"
                    variant="muted"
                    name="Saved View">
                    <p>stuff</p>
                  </DropdownButton>
                </div>
              </div>
            </div>

            <div style={STYLES.graphContainer}>
              <img style={STYLES.graph} src="http://placehold.it/1200x500?text=GRAPH!" />
            </div>

            <div style={STYLES.tableActions}>
              <div style={STYLES.tableSelect}>
                {tableSelectHTML}
              </div>
              <div>
                {tableButtonHtml}
              </div>
            </div>

            <div style={STYLES.baseContainer}>
              <RankingsTable
                allRowsSelected={this.state.rankingsData.rankingsTableAllRowsSelected}
                graphKeyword={(item) => console.log('graph keyword', item)}
                pagerCurrentPage={this.state.rankingsData.rankingsTableCurrentPage}
                pagerCurrentSize={this.state.rankingsData.rankingsTablePageSize}
                pagerTotalPages={this.state.rankingsData.rankingsTableTotalPages}
                selectAllRows={(current) => RankingsActions.selectAllRows(current)}
                selectedTags={this.state.rankingsData.rankingsTableSelectedTags}
                selectKeyword={(keyword) => console.log('keyword select', keyword)}
                selectRow={(row) => RankingsActions.selectRow(row)}
                selectTag={(tag) => RankingsActions.selectTag(tag)}
                tableData={this.state.rankingsData.rankingsTableDataFiltered}
                tableSettings={this.state.rankingsData.rankingsTableSettings}/>
            </div>
            <div style={STYLES.pagerContainer}>
              <Pager
                currentPage={this.state.rankingsData.rankingsTableCurrentPage}
                currentSize={this.state.rankingsData.rankingsTablePageSize}
                onChange={(values) => RankingsActions.setTableSize(values)}
                pageSizes={[20, 50, 100]}
                totalPages={this.state.rankingsData.rankingsTableTotalPages}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}));

const STYLES = {
  pageContainer : {
    display  : 'flex',
    margin   : '0 auto',
    maxWidth : '1600px',
    minWidth : '1200px'
  },
  navContainer : {
    width : '200px'
  },
  contentContainer : {
    margin  : '20px 0',
    padding : `0 ${gu(4)}`,
    width   : '100%'
  },
  pageHeadingContainer : {
    alignItems     : 'center',
    display        : 'flex',
    justifyContent : 'space-between'
  },
  pageTitleContainer : {
    display        : 'flex',
    flex           : '0 0 500px',
    justifyContent : 'flex-start'
  },
  pageTitle : {
    margin : 0
  },
  headerButtons : {
    display        : 'flex',
    flex           : '0 0 240px',
    justifyContent : 'flex-end' // space-between when there are other buttons
  },
  subHeaderContainer : {
    marginTop : '40px'
  },
  subHeaderActions : {
    display : 'flex'
  },
  graphDateRange : {
    flex : '0 0 auto'
  },
  savedView : {
    display        : 'flex',
    justifyContent : 'flex-end',
    width          : '100%'
  },
  graphContainer : {
    background : colors.neutral['0'],
    boxShadow  : `0 2px 2px rgba(13, 16, 23, 0.3)`,
    marginTop  : gu(2),
    padding    : gu(4)
  },
  tableActions : {
    alignItems     : 'flex-end',
    display        : 'flex',
    justifyContent : 'space-between',
    margin         : `${gu(4)} 0`,
    minHeight      : gu(12)
  },
  tableSelect : {
    flex     : '1 0 auto',
    maxWidth : '400px'
  },
  tableAddTagsContainer : {
    alignItems : 'center',
    display    : 'flex'
  },
  tableAddTagsSelect : {
    flex        : '1 0 auto',
    marginRight : gu(2),
    width       : '350px'
  },
  tableAddTagsCount : {
    color     : colors.neutral['300'],
    fontStyle : 'italic'
  },
  tableRemoveTags : {
    flex       : '1 0 auto',
    marginLeft : gu(2)
  },
  pagerContainer : {
    marginTop : gu(4)
  },

  // remove when actual graph is in
  graph : {
    width : '100%',
    height: '500px'
  }
};