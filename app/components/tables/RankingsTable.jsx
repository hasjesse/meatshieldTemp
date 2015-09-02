
// TODO: add left or right alignment for the dropdown. So when implemented you can decide where the dropdown shows up.

import React from 'react';
import Radium from 'radium';

import MDHQBase, {autobind, NOOP} from '../base/Base';
import {gridUnits as gu, combineStyles, colors} from '../base/styleHelpers';

import Checkbox from '../inputs/Checkbox';
import Tag from '../tags/Tag';
import RankingsTableRow from '../tables/RankingsTableRow';

// Delphi
import Icon from 'delphi/icon/Icon';

import './RankingsTable.less';

function getHeaderCellStyles(cell) {
  return combineStyles(
    STYLES.allCells,
    cell ? STYLES[cell] : null,
    STYLES.headerCell
  );
}

@Radium
export default class MDHQRankingsTable extends MDHQBase {

  constructor(...props) {
    super(...props);
    this.state = {
      allChecked : false
    };
  }

  @autobind
  allChecked() {
    this.props.selectAllRows(!this.state.allChecked);
    this.setState({
      allChecked : !this.state.allChecked
    });
  }

  render() {
    return (
      <div style={STYLES.container}>
        <div style={STYLES.header}>
          <div style={getHeaderCellStyles('checkCell')}>
            <Checkbox
              checked={this.props.allRowsSelected}
              name="checked"
              onChange={() => this.allChecked(this.state.allChecked)}/>
          </div>
          <div style={getHeaderCellStyles('reportCell')}>Report</div>
          <div style={getHeaderCellStyles('rankCell')}>Rank</div>
          <div style={getHeaderCellStyles('difficultyCell')}>Difficulty</div>
          <div style={getHeaderCellStyles('volumeCell')}>Volume</div>
          <div style={getHeaderCellStyles('installsCell')}>Est. Installs</div>
          <div style={getHeaderCellStyles('organicCell')}>% of Organic Installs</div>
        </div>

        {this.props.tableData.map((data, index) =>{
          return(
            <RankingsTableRow
              graphKeyword={() => this.props.graphKeyword(data)}
              key={index}
              rowData={data}
              selectedTags={this.props.selectedTags}
              selectKeyword={() => this.props.selectKeyword(data)}
              selectRow={() => this.props.selectRow(data)}
              selectTag={(tag) => this.props.selectTag(tag)}
              styles={STYLES}/>
          );
        })}
      </div>
    );
  }
}

MDHQRankingsTable.defaultProps = {
  checked       : 'false',
  graphKeyword  : NOOP,
  selectedTags  : [],
  selectKeyword : NOOP,
  selectRow     : NOOP,
  selectTag     : NOOP,
  tableData     : [],
  allRowsSelected : false
};

MDHQRankingsTable.propTypes = {};

const STYLES = {
  container : {
    boxShadow : `0 2px 2px rgba(13, 16, 23, 0.3)`,
    width     : '100%'
  },
  headerCell : {
    background : colors.neutral['700'],
    borderRight : `solid 1px ${colors.neutral['0']}`,
    color   : 'white',
    textAlign : 'left',
  },
  row : {
    background : colors.neutral['0'],
    display : 'flex',
    minHeight : gu(20),
    paddingBottom : gu(3),
    borderBottom : `1px solid ${colors.neutral['100']}`
  },
  allCells : {
    padding : `${gu(2)} ${gu(2)}`,
    flex    : '1 0 auto'
  },
  header : {
    display : 'flex'
  },
  checkCell : {
    alignItems     : 'center',
    flex           : '0 0 auto',
    justifyContent : 'center'
  },
  reportTop : {
    alignItems : 'center',
    display : 'flex',
    padding : '2px 0',
    width : '100%'
  },
  reportKeywordTitle : {
    color :colors.accent.primary['600'],
    cursor : 'pointer',
    flex : '1 0 auto',
    fontSize : '14px',
    fontWeight : '400',
    lineHeight : '20px',
    margin : '0'
  },
  reportGraphIcon : {
    cursor : 'pointer',
    display : 'flex',
    justifyContent : 'flex-end',
    lineHeight : '13px',
    marginRight : gu(4)
  },
  reportCategory : {
    color : colors.neutral['300'],
    fontSize : '12px',
    lineHeight : '20px'
  },
  reportCell : {
    flex : '2 0 400px',
    minWidth : '400px',
  },
  rankCell : {
    flex     : `1 0 ${gu(12)}`,
    textAlign : 'right'
  },
  difficultyCell : {
    flex     : `1 0 ${gu(23)}`,
    textAlign : 'right'
  },
  volumeCell : {
    flex     : `1 0 ${gu(23)}`,
    textAlign : 'right'
  },
  installsCell : {
    flex     : `1 0 ${gu(23)}`,
    textAlign : 'right',
    borderRight : 'none'
  },
  organicCell : {
    flex     : `1 0 ${gu(28)}`,
    textAlign : 'right',
  }
};
