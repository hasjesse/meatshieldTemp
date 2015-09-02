import React from 'react';
import Radium from 'radium';

import MDHQBase, {autobind, NOOP} from 'mdhq-components/base/Base';
import {gridUnits as gu, combineStyles, colors} from '../base/styleHelpers';

function getStyles(props) {
  STYLES.base.backgroundColor = props.backgroundColor;
  STYLES.base[':hover'].backgroundColor = props.hoverColor;
  STYLES.disabled.backgroundColor = props.hoverColor;
  return combineStyles(
    STYLES.base,
    props.disabled && STYLES.disabled
  );
}

@Radium
export default class MDHQTag extends MDHQBase {

  render() {
    return (
      <div
        onClick={this.props.onClick}
        style={getStyles(this.props)}>
        {this.props.name}
      </div>
    );
  }
}

MDHQTag.propTypes = {
  'backgroundColor' : React.PropTypes.string,
  'disabled'        : React.PropTypes.bool,
  'hoverColor'      : React.PropTypes.string,
  'name'            : React.PropTypes.string.isRequired,
  'onClick'         : React.PropTypes.func
};

MDHQTag.defaultProps = {
  'backgroundColor' : colors.neutral[400],
  'disabled'        : false,
  'hoverColor'      : colors.neutral[300],
  'onClick'         : NOOP
};

const STYLES = {
  // :hover & background colors are set above in getStyles
  base : {
    borderRadius    : '20',
    color           : 'white',
    cursor          : 'pointer',
    display         : 'inline-flex',
    fontSize        : '12px',
    lineHeight      : gu(4),
    marginRight     : gu(1),
    padding         : `0 ${gu(2)}`,
    ':hover'        : {}
  },
  disabled : {
    cursor         : 'default',
    pointerEvents : 'none'
  }
};