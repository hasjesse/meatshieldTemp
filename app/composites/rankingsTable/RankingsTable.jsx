import React from 'react';
import Radium from 'radium';

import MDHQBase, {autobind, NOOP} from '../../components/base/Base';
import {gridUnits as gu, combineStyles, colors} from '../../components/base/styleHelpers';

// Components
import Tag from '../../components/tags/Tag';

// TXL
import Gear from 'txl/icons/icons/Gear';
import Checkbox from 'txl/input-fields/Checkbox';

import RankingsTableRow from './RankingsTableRow';
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
    // split the data based on pagination info
    let offSet = (this.props.pagerCurrentPage -1)*this.props.pagerCurrentSize;
    let pagedDataSet = this.props.tableData.slice(offSet, offSet + this.props.pagerCurrentSize);

    return (
      <div style={STYLES.container}>
        <div style={STYLES.header}>
          <div style={getHeaderCellStyles('checkCell')}>
            <Checkbox
              onChange={() => this.allChecked(this.state.allChecked)}
              checked={this.props.allRowsSelected}
              disabled={false}
              value="AllChecked"
              name="AllChecked" />
          </div>
          <div key={'reportCell'} style={getHeaderCellStyles('reportCell')}>Report</div>
          {this.props.tableSettings.map((col, index) => {
            if(col.checked){
              return(
                <div
                  key={index}
                  style={getHeaderCellStyles(col.styles)}>
                  {col.name}
                </div>
              );
            }
          })}
        </div>

        {pagedDataSet.map((data, index) =>{
          return(
            <RankingsTableRow
              graphKeyword={() => this.props.graphKeyword(data)}
              key={index}
              rowData={data}
              selectedTags={this.props.selectedTags}
              selectKeyword={() => this.props.selectKeyword(data)}
              selectRow={() => this.props.selectRow(data)}
              selectTag={(tag) => this.props.selectTag(tag)}
              styles={STYLES}
              tableSettings={this.props.tableSettings} />
          );
        })}
      </div>
    );
  }
}

MDHQRankingsTable.defaultProps = {
  allRowsSelected : false,
  checked         : false,
  graphKeyword    : NOOP,
  selectedTags    : [],
  selectKeyword   : NOOP,
  selectRow       : NOOP,
  selectTag       : NOOP,
  tableData       : [],
  tableSettings   : []
};

MDHQRankingsTable.propTypes = {
  allRowsSelected : React.PropTypes.bool,
  checked         : React.PropTypes.bool,
  graphKeyword    : React.PropTypes.func,
  selectedTags    : React.PropTypes.array,
  selectKeyword   : React.PropTypes.func,
  selectRow       : React.PropTypes.func,
  selectTag       : React.PropTypes.func,
  tableData       : React.PropTypes.array,
  tableSettings   : React.PropTypes.array
};

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