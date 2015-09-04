import React from 'react';
import Radium from 'radium';

import MDHQBase, {autobind, NOOP} from '../base/Base';
import {combineStyles, colors} from '../base/styleHelpers';

function getStyles(props) {
  return combineStyles(
    STYLES.base,
    STYLES.elevation[props.elevation]
  );
}

@Radium
export default class MDHQCard extends MDHQBase {

  render() {
    return (
      <div
        data-component="MDHQCard"
        style={getStyles(this.props)}
        onClick={this.props.onClick}>
        {this.props.children}
      </div>
    );
  }
}

MDHQCard.defaultProps = {
  elevation    : 0,
  onClick      : NOOP
};

MDHQCard.propTypes = {
  disabled   : React.PropTypes.number,
  onClick    : React.PropTypes.func
};

const STYLES = {
  base : {
    backgroundColor : colors.neutral['0'],
    padding         : '4rem',
    position        : 'relative',
    width           : '100%'
  },
  elevation : {
    0 : {},
    1 : {
      boxShadow : '0px 2px 2px 0px rgba(0,28,61,0.2)' //Pacific Storm 900
    },
    2 : {
      boxShadow : '0px 2px 2px 0px rgba(0,28,61,0.3)' //Pacific Storm 900
    },
    3 : {
      boxShadow : '0px 4px 4px 0px rgba(0,28,61,0.4)' //Pacific Storm 900
    },
    4 : {
      boxShadow : '0px 6px 6px 0px rgba(0,28,61,0.5)' //Pacific Storm 900
    }
  }
}