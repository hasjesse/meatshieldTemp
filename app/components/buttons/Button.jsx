import React from 'react';
import Radium from 'radium';

import MDHQBase, {autobind, NOOP} from '../base/Base';
import {gridUnits as gu, combineStyles, colors} from '../base/styleHelpers';

function getStyles(props) {
  return combineStyles(
    STYLES.base,
    props.disabled && STYLES.disabled,
    !props.disabled && STYLES.variant[props.variant],
    STYLES.size[props.size]
  );
}

@autobind
@Radium // order is important here, radium will improperly apply hover if reversed
export default class MDHQButton extends MDHQBase {

  render() {
    return (
      <button
        data-component="MDHQButton"
        disabled={this.props.disabled ? '' : undefined}
        style={getStyles(this.props)}
        onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

MDHQButton.defaultProps = {
  disabled : false,
  onClick  : NOOP,
  size     : 'standard',
  variant  : 'neutral'
};

MDHQButton.propTypes = {
  disabled   : React.PropTypes.bool,
  onClick    : React.PropTypes.func,
  size       : React.PropTypes.oneOf(['standard', 'large', 'square']),
  variant    : React.PropTypes.oneOf(['accent', 'neutral', 'muted', 'plain'])
};

const STYLES = {
  base : {
    borderRadius : 2,
    display      : 'inline-block',
    fontSize     : 14,
    padding      : `0 ${gu(3)}`,
    transition   : 'background-color .1s linear'
  },
  variant : {
    accent : {
      backgroundColor : colors.accent.primary['500'],
      color           : colors.neutral['0'],
      ':hover'        : {
        backgroundColor : colors.accent.primary['600']
      }
    },
    neutral : {
      backgroundColor : colors.neutral['600'],
      color           : colors.neutral['0'],
      ':hover'        : {
        backgroundColor : colors.neutral['700']
      }
    },
    muted : {
      backgroundColor : colors.neutral['100'],
      color           : colors.neutral['800'],
      ':hover'        : {
        backgroundColor : colors.neutral['200']
      }
    },
    plain : {
      backgroundColor : 'transparent',
      color           : colors.neutral['300'],
      ':hover'        : {
        color : colors.neutral['900']
      }
    }
  },
  size: {
    standard : {
      height     : gu(5),
      lineHeight : gu(5 * .9) //height tweak, looks slightly off vertically otherwise
    },
    large: {
      height     : gu(7),
      lineHeight : gu(7 * .9) //height tweak, looks slightly off vertically otherwise
    },
    square : {
      height     : gu(5),
      lineHeight : gu(5 * .9) ,//height tweak, looks slightly off vertically otherwise
      padding    : '0',
      width      : gu(5)
    }
  },
  disabled     : {
    backgroundColor : colors.neutral['100'],
    color           : colors.neutral['200'],
    cursor          : 'not-allowed'
  }
}