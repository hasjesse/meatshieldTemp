import React from 'react';
import Radium from 'radium';
import moment from 'moment';
import _ from 'lodash';

import MDHQBase, {autobind, NOOP} from '../base/Base';
import {gridUnits as gu, combineStyles, colors} from '../base/styleHelpers';

// TXL
import {CalendarOutline} from 'txl/icons/Icons';
import Button from 'txl/buttons/Button'
import CalendarPickerWithPresets from 'txl/calendar-picker/CalendarPickerWithPresets';

import './DatePicker.less';

// TODO: clicking outside the component does not close correctly there is some weirdness around this

@Radium
export default class MDHQDateRangePicker extends MDHQBase {

  constructor(...props) {
    super(...props);
    this.state = {
      datesSelected : {},
      dropdownOpen : false
    };
  }

  @autobind
  componentDidMount() {
    document.addEventListener('click', this._documentClickHandler);
  }

  @autobind
  componentWillUnmount() {
    document.removeEventListener('click', this._documentClickHandler);
  }

  @autobind
  _documentClickHandler(e) {
    var parentNode = e.target;


    if (this.state.dropdownOpen) {
      var toggleBtnNode = this.refs.DateRangePickerFeild.getDOMNode();
      var boxNode = this.refs.DateRangePickerBox.getDOMNode();

      while (parentNode) {
        // if toggle btn or clicked inside edit box
        if (parentNode === toggleBtnNode || parentNode === boxNode) {
          return;
        }
        if (_.includes(['TxlCalendarPresets', 'TxlCalendar', 'TxlCalendarPicker'], parentNode.getAttribute('data-component')) ||
        parentNode.className === 'DateRangePickerBox') {
          return;
        }
        if (parentNode === document.body) {
          this.setState({'dropdownOpen': false});
          return;
        }
        parentNode = parentNode.parentNode;
      }
      // if clicked outside of toggle btn or edit box
      this.setState({'dropdownOpen': false});
    }
  }

  @autobind
  _toggleDropdown(e) {
    e.preventDefault();
    this.setState({'dropdownOpen': !this.state.dropdownOpen});
  }

  @autobind
  handleChange(input) {
    console.log(input);
    if (this.props.useMoment) {
      _.assign(input, {
        startDate: moment(input.startDate),
        endDate: moment(input.endDate)
      });
    }
    this.props.onChange(input);
  }

  render() {
    return (
      <div style={STYLES.container}>
        <div className='datePicker'>
          <div className='datePicker-input-container' ref="DateRangePickerFeild" onClick={this._toggleDropdown}>

            <CalendarOutline />

            <span className='datePicker-date-wrapper'>
              {this.props.startDate.format('MMMM Do')} - {this.props.endDate.format('MMMM Do, YYYY')}
            </span>
          </div>
        </div>

        {this.state.dropdownOpen &&
        <div
          ref="DateRangePickerBox"
          className="DateRangePickerBox"
          style={STYLES.dropdownContainer}>
          <div style={STYLES.calloutArrow}></div>
          <CalendarPickerWithPresets
            onDateSelect={(date) => this.setState({datesSelected : date})} />
          <div style={STYLES.calendarButtons}>
            <Button
              onClick={() => this.props.applyDate(this.state.datesSelected)}
              variant="accent">
              Apply
            </Button>
            <Button
              onClick={() => this.props.applyDate(this.state.datesSelected)}
              variant="muted">
              Cancel
            </Button>
          </div>
        </div>
        }
      </div>
    );
  }
}

MDHQDateRangePicker.defaultProps = {
  applyDate            : NOOP,
  endDate              : moment().add(7, 'days'),
  isPropagationStopped : false,
  onChange             : NOOP,
  startDate            : moment(),
  useMoment            : false
};

MDHQDateRangePicker.propTypes = {
  applyDate            : React.PropTypes.func,
  endDate              : React.PropTypes.object,
  isPropagationStopped : React.PropTypes.bool,
  onChange             : React.PropTypes.func,
  startDate            : React.PropTypes.object,
  useMoment            : React.PropTypes.bool
};

const STYLES = {
  icon : {
    height : '13px',
    width  : '13px',
    margin : '0 0 0 5px'
  },
  container : {
    display  : 'inline-block',
    position : 'relative'
  },
  dropdownContainer : {
    backgroundColor : colors.neutral['0'],
    border          : '1px solid #e3eced',
    boxShadow       : `0 2px 2px rgba(13, 16, 23, 0.3)`,
    color           : '#2b3b49',
    position        : 'absolute',
    top             : '40px',
    zIndex          : '50'
  },
  calloutArrow : {
    backgroundColor : 'white',
    height          : '14px',
    left            : '9px',
    position        : 'absolute',
    top             : '-7px',
    transform       : 'rotate(45deg)',
    width           : '14px'
  },
  calendarButtons : {
    borderTop : `1px solid ${colors.neutral['100']}`,
    padding   : gu(2)
  }
};