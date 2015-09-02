import React from 'react';
import Radium from 'radium';
import _ from 'lodash';

import MDHQBase, {autobind, NOOP} from '../base/Base';
import {gridUnits as gu, combineStyles, colors} from '../base/styleHelpers';

import Icon from 'delphi/icon/Icon';

// only has styles for classes passed to the icon
require('./checkbox.less');

@Radium
export default class MDHQCheckbox extends MDHQBase {

  render() {
    let checkboxCombined = combineStyles(
      STYLES.checkbox.base,
      this.props.checked === true && STYLES.checkbox.selected
    );

    let iconClass = this.props.checked ? 'm-check-show' : 'm-check-hide';

    return (
      <label
        style={STYLES.container}>
        <div style={STYLES.inputCell}>
          <input
            type="checkbox"
            name={this.props.name}
            onChange={(e)=> this.props.onChange(e)}
            checked={this.props.checked}
            style={STYLES.input} />

          <div style={checkboxCombined}>
            <Icon
              className={iconClass}
              icon="check"/>
          </div>
        </div>
        {_.isEmpty(this.props.label) ? null : <div style={STYLES.checkbox.label}><span>{this.props.label}</span></div>}
      </label>
    );
  }
}

MDHQCheckbox.propTypes = {
  'checked'  : React.PropTypes.bool,
  'label'    : React.PropTypes.node,
  'name'     : React.PropTypes.string,
  'onChange' : React.PropTypes.func
};

MDHQCheckbox.getDefaultProps = {
  'checked'  : false,
  'label'    : '',
  'name'     : '',
  'onChange' : NOOP
};

const STYLES = {
  container : {
    alignItems : 'center',
    cursor     : 'pointer',
    display    : 'inline-flex',
    width      : '100%'
  },
  input : {
    display : 'none'
  },
  inputCell : {
    alignItems     : 'center',
    display : 'flex',
    height : gu(5),
    justifyContent : 'center',
    width : gu(5)
  },
  checkbox : {
    base   : {
      alignItems     : 'center',
      background     : 'white',
      border         : `1px solid ${colors.border.base}`,
      borderRadius   : '2',
      display        : 'flex',
      height         : '13px',
      justifyContent : 'center',
      width          : '13px'
    },
    selected : {
      background : colors.accent.primary[500],
      border     : `1px solid ${colors.accent.primary[500]}`
    },
    label : {
      flex        : '100 0 auto',
      paddingLeft : gu(1),
      fontSize    : '12px'
    }
  }
};