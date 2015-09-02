// TODO: add left or right alignment for the dropdown. So when implemented you can decide where the dropdown shows up.

import React from 'react';
import Radium from 'radium';
import moment from 'moment';
import _ from 'lodash';


import MDHQBase, {autobind, NOOP} from 'mdhq-components/base/Base';
import {gridUnits as gu, combineStyles, colors} from '../base/styleHelpers';

import Icon from 'delphi/icon/Icon';
import DatePicker from 'delphi/date-range-picker/DateRangePicker';

import './DatePicker.less';

@Radium
export default class MDHQDateRangePicker extends MDHQBase {

  constructor(...props) {
    super(...props);
    this.state = {
      'dropdownOpen' : false
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
        if (parentNode === toggleBtnNode || parentNode === boxNode) {return;}
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

            <Icon style={STYLES.icon} icon="calendar-outline" />

            <span className='datePicker-date-wrapper'>
              {this.props.startDate.format('MMMM Do')} - {this.props.endDate.format('MMMM Do, YYYY')}
            </span>
          </div>
        </div>

        {this.state.dropdownOpen &&
        <div
          ref="DateRangePickerBox"
          style={STYLES.dropdownContainer}>
          <div style={STYLES.calloutArrow}></div>
          <DatePicker
            onChange={this.handleChange}
            numCals={3}
            startDate={this.props.startDate}
            endDate={this.props.endDate}
            rangeMode={true} />
        </div>
        }
      </div>
    );
  }
}

MDHQDateRangePicker.defaultProps = {
  onChange: NOOP,
  startDate: moment(),
  endDate: moment().add(7, 'days'),
  useMoment: false,
  isPropagationStopped: false
};

MDHQDateRangePicker.propTypes = {
  onChange: React.PropTypes.func,
  startDate: React.PropTypes.object,
  endDate: React.PropTypes.object,
  useMoment: React.PropTypes.bool,
  isPropagationStopped: React.PropTypes.bool
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
    backgroundColor: colors.neutral['0'],
    border: '1px solid #e3eced',
    boxShadow: '0 2px 8px #e3eced',
    color: '#2b3b49',
    padding: '10px',
    position: 'absolute',
    top: '40px',
    zIndex: '50'
  }
};