import React from 'react';
import Radium from 'radium';
import _ from 'lodash';

import MDHQBase, {autobind, NOOP} from '../base/Base';
import {gridUnits as gu, combineStyles, colors} from '../base/styleHelpers';

import Icon from 'delphi/icon/Icon.jsx';

require('./radiobutton.less');

@Radium
export default class MDHQRadiobutton extends MDHQBase {

  render() {
    let RadiobuttonCombined = combineStyles(
      STYLES.Radiobutton.base,
      this.props.checked === true && STYLES.Radiobutton.selected
    );

    let iconClass = this.props.checked ? 'm-radio-show' : 'm-radio-hide';
    let iconSvg = '<svg viewBox=\"0 0 10 10\" preserveAspectRatio=\"xMinYMin meet\"><circle cx=\"5\" cy=\"5\" r=\"5\"/></svg>'
    let setHtml = () => {
      return {'__html': iconSvg || ''}
    }

    return (
      <label
        style={STYLES.container}>
        <div style={STYLES.inputCell}>
          <input
            checked={this.props.checked}
            disabled={this.props.disabled}
            name={this.props.name}
            onChange={(e)=> this.props.onChange(e)}
            style={STYLES.input}
            type="radio"
            value={this.props.value}/>

          <div style={RadiobuttonCombined}>
            <i className={iconClass}
               dangerouslySetInnerHTML = {setHtml()} />
          </div>

        </div>
        {_.isEmpty(this.props.label) ? null : <div style={STYLES.Radiobutton.label}><span>{this.props.label}</span></div>}
      </label>
    );
  }
}

MDHQRadiobutton.propTypes = {
  'checked'  : React.PropTypes.bool,
  'disabled' : React.PropTypes.bool,
  'label'    : React.PropTypes.node,
  'name'     : React.PropTypes.string,
  'onChange' : React.PropTypes.func,
  'value'    : React.PropTypes.string
};

MDHQRadiobutton.getDefaultProps = {
  'checked'  : false,
  'disabled' : false,
  'label'    : '',
  'name'     : '',
  'onChange' : NOOP,
  'value'    : ''
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

  Radiobutton : {
    base   : {
      alignItems     : 'center',
      border         : `1px solid ${colors.border.base}`,
      borderRadius   : '9',
      display        : 'flex',
      height         : '16px',
      width          : '16px',
      justifyContent : 'center',
    },
    selected : {
      border      : `1px solid ${colors.accent.primary[500]}`,
    },
    label : {
      fontSize    : '12px',
      flex        : '100 0 auto',
      paddingLeft : gu(1)
    }
  }
};