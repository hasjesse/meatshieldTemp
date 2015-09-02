import React from 'react';
import Radium from 'radium';
import Reflux from 'reflux';

import MDHQBase, {autobind, NOOP} from '../components/base/Base';
import {gridUnits as gu, combineStyles, colors} from '../components/base/styleHelpers';

// Components
import Button from '../components/buttons/Button';
import DropdownButton from '../components/buttons/DropdownButton';
import DateRangePicker from '../components/dateRangePicker/DateRangePicker';
import Select from '../components/select/Select';

import RankingsTable from '../components/tables/RankingsTable';

// Delphi
import TMCNavigation from 'delphi/TMC/TMCNavigation';
import Icon from 'delphi/icon/Icon';

// Actions
import RankingsActions from '../actions/RankingsActions';

// Stores
import RankingsStore from '../stores/RankingsStore';


module.exports = Radium(React.createClass({
  displayName : 'MDHQRankingsPage',
  propTypes   : {},
  mixins      : [
    Reflux.connect(RankingsStore, 'rankingsData')
  ],

  getDefaultProps : function() {},

  getInitialState : function () {
    return {
      rankingsData : RankingsStore.getExposedData(),
      selectedTags : [],
    };
  },

  componentDidMount : function() {
    RankingsActions.loadRankingsTable();
    RankingsActions.loadRankingsTableFilters();
    RankingsActions.loadRankingsTableSettings();
  },

  render : function() {
    var productLinks = [
      {
        'name' : 'Mobile App Tracking',
        'url'  : `https://login.mobileapptracking.com?redirectUrl=https://platform.mobileapptracking.com/handler/authentication/loginViaSessionToken`
      }
    ];

    // Show settings or Stop Tracking
    let tableButtonHtml = (
      <Button
        size="square"
        variant="muted"
        onClick={()=> console.log('settings clicked')}>
        <Icon icon="gear"/>
      </Button>
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
      <div>
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
                <Button
                  size="large"
                  variant="accent">
                  Add Keyword
                </Button>
                <DropdownButton
                  size="large"
                  variant="neutral"
                  name="Export">
                  <p>stuff</p>
                </DropdownButton>
              </div>
            </div>

            <div style={STYLES.subHeaderContainer}>
              <h2>Performance Trends</h2>
              <div style={STYLES.subHeaderActions}>
                <div style={STYLES.graphDateRange}>
                  <DateRangePicker />
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
                <Select
                  disabled={false}
                  multiSelect={true}
                  noResultsText={'Sorry, there are no results.'}
                  optionSelected={(allSelected) => RankingsActions.selectTagDropdown(allSelected)}
                  options={this.state.rankingsData.rankingsTableFilterData}
                  placeholder={'Search'}
                  searchable={true}
                  value={this.state.rankingsData.rankingsTableSelectedTags}/>
              </div>

              <div>
                {tableButtonHtml}
              </div>
            </div>

            <div style={STYLES.baseContainer}>
              <RankingsTable
                allRowsSelected={this.state.rankingsData.rankingsTableAllRowsSelected}
                graphKeyword={(item) => console.log('graph keyword', item)}
                selectAllRows={(current) => RankingsActions.selectAllRows(current)}
                selectedTags={this.state.rankingsData.rankingsTableSelectedTags}
                selectKeyword={(keyword) => console.log('keyword select', keyword)}
                selectRow={(row) => RankingsActions.selectRow(row)}
                selectTag={(tag) => RankingsActions.selectTag(tag)}
                tableData={this.state.rankingsData.rankingsTableDataFiltered}
                tableSettings={this.state.rankingsData.rankingsTableSettings}/>
            </div>

          </div>
        </div>
      </div>
    );
  }
}));

const STYLES = {
  pageContainer : {
    minWidth : '1200px',
    maxWidth : '1600px',
    margin   : '0 auto',
    display  : 'flex'
  },
  navContainer : {
    width : '200px'
  },
  contentContainer : {
    width   : '100%',
    padding : `0 ${gu(4)}`,
    margin  : '20px 0'
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
    justifyContent : 'space-between'
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
    display : 'flex',
    justifyContent : 'flex-end',
    width : '100%'
  },
  graphContainer : {
    marginTop : gu(2),
    background : colors.neutral['0'],
    padding : gu(4),
    boxShadow : `0 2px 2px rgba(13, 16, 23, 0.3)`
  },
  tableActions : {
    display : 'flex',
    justifyContent : 'space-between',
    alignItems : 'center',
    margin  : `${gu(4)} 0`
  },
  tableSelect : {
    flex : '1 0 auto',
    maxWidth : '350px'
  },

  // remove when actual graph is in
  graph : {
    width : '100%',
    height: '500px'
  }
};
