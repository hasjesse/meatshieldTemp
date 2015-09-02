
// TODO: add left or right alignment for the dropdown. So when implemented you can decide where the dropdown shows up.

import React from 'react';
import Radium from 'radium';
import _ from 'lodash';

import MDHQBase, {autobind, NOOP} from '../base/Base';
import {gridUnits as gu, combineStyles, colors} from '../base/styleHelpers';

import Checkbox from '../inputs/Checkbox';
import Tag from '../tags/Tag';
import ProgressBar from '../progress/ProgressBar';

import Icon from 'delphi/icon/Icon';

import './RankingsTable.less';

// Special Tag Colors
const specialTags = {
  'Top Charts' : {
    background : '#184940',
    hover      : '#226659'
  },
  'Feature' : {
    background : '#00846b',
    hover      : '#00a888'
  },
  'Top 10' : {
    background : '#3fc7b0',
    hover      : '#94eddc'
  },
  'Top 20' : {
    background : '#ff8482',
    hover      : '#ffb3b3'
  },
  'Low Rank' : {
    background : '#e71336',
    hover      : '#ff5957'
  },
  'Keyword Suggestion' : {
    background : '#007aff',
    hover      : '#55aeff'
  }
};

function getCellStyles(cell, STYLES) {
  return combineStyles(
    STYLES.allCells,
    cell ? STYLES[cell] : null
  );
}

@Radium
export default class MDHQRankingsTableRow extends MDHQBase {

  @autobind
  isTagDisabled(tag) {
    let disabled = false;
    this.props.selectedTags.forEach(item => {
      if(item.value === tag.value){
        disabled = true
      }
    });
    return disabled;
  }

  render() {
    // Styles that are passed in via props
    let STYLES = this.props.styles;

    // Generates Tags/Labels and checks against specialTags for unique colors
    let tagsHTML = null;
    if(this.props.rowData.labels.length > 0){
      tagsHTML = this.props.rowData.labels.map((item, index) =>{
        return(
          <Tag
            backgroundColor={specialTags.hasOwnProperty(item.label) ? specialTags[item.label].background : colors.neutral[400]}
            disabled={this.isTagDisabled(item)}
            hoverColor={specialTags.hasOwnProperty(item.label) ? specialTags[item.label].hover : colors.neutral[300]}
            key={index}
            name={item.label}
            onClick={()=> this.props.selectTag(item)}/>
        );
      });
    }

    return (
      <div style={STYLES.row}>
        <div style={getCellStyles('checkCell', STYLES)}>
          <Checkbox
            checked={this.props.rowData.checked}
            name="checked"
            onChange={() => this.props.selectRow()}/>
        </div>
        <div style={getCellStyles('reportCell', STYLES)}>
          <div style={STYLES.reportTop}>
            <h3
              onClick={() => this.props.selectKeyword()}
              style={STYLES.reportKeywordTitle}>
              {this.props.rowData.search_term}
            </h3>
              <span
                onClick={() => this.props.graphKeyword()}
                style={STYLES.reportGraphIcon}>
                <Icon className="m-rankings-graph-icon" icon={'graph-bar2'}/>
              </span>
          </div>
          <div>
            {_.isEmpty(this.props.rowData.category) ? null : <span style={STYLES.reportCategory}>{this.props.rowData.category}</span>}
            <div>
              {tagsHTML}
            </div>
          </div>
        </div>
        <div style={getCellStyles('rankCell', STYLES)}>{this.props.rowData.rank}</div>
        <div style={getCellStyles('difficultyCell', STYLES)}>
          <ProgressBar
            fillColor={colors.neutral['700']}
            percentage={this.props.rowData.difficulty}
            size="large"/>
          {this.props.rowData.difficulty}
        </div>
        <div style={getCellStyles('volumeCell', STYLES)}>{this.props.rowData.volume}</div>
        <div style={getCellStyles('installsCell', STYLES)}>{this.props.rowData.organic_installs.estimated_count}</div>
        <div style={getCellStyles('organicCell', STYLES)}>{this.props.rowData.organic_installs.percentage}%</div>
      </div>
    );
  }
}

MDHQRankingsTableRow.defaultProps = {
  checked       : false,
  graphKeyword  : NOOP,
  rowData       : {},
  selectKeyword : NOOP,
  selectRow     : NOOP,
  selectTag     : NOOP,
  styles        : {}
};

MDHQRankingsTableRow.propTypes = {};


//const STYLES = {
// Styles are passed in via props see above
//};
