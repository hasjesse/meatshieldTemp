
// TODO: add left or right alignment for the dropdown. So when implemented you can decide where the dropdown shows up.

import React from 'react';
import Radium from 'radium';

import MDHQBase, {autobind, NOOP} from '../base/Base';
import {gridUnits as gu, combineStyles, colors} from '../base/styleHelpers';

import Icon from 'delphi/icon/Icon';

import './DropdownButton.less';

function getStyles(props, btn) {
  return combineStyles(
    STYLES.base,
    props.disabled && STYLES.disabled,
    !props.disabled && STYLES.variant[props.variant],
    STYLES.size[props.size],
    STYLES[`${btn}`]
  );
}


@Radium
export default class MDHQDropdownButton extends MDHQBase {

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
      var toggleBtnNode = this.refs.DropdownButtonToggle.getDOMNode();
      var boxNode = this.refs.DropdownBoxToggle.getDOMNode();

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

  render() {
    return (
      <div style={STYLES.container}>
        <button
          data-component="MDHQButton"
          disabled={this.props.disabled ? '' : undefined}
          style={getStyles(this.props, 'leftBtn')}>
          {this.props.name}
        </button>
        <button
          key="iconBtn"
          ref="DropdownButtonToggle"
          style={getStyles(this.props, 'rightBtn')}
          onClick={this._toggleDropdown}>
          <Icon className="m-dropdown-button-icon" icon={this.props.icon}/>
        </button>
        {this.state.dropdownOpen &&
        <div
          ref="DropdownBoxToggle"
          style={STYLES.dropdownContainer}>
          <div style={STYLES.calloutArrow}></div>
          {this.props.children}
        </div>
        }
      </div>
    );
  }
}

MDHQDropdownButton.defaultProps = {
  disabled : false,
  icon     : 'arrow-down',
  onClick  : NOOP,
  size     : 'standard',
  variant  : 'neutral'
};

MDHQDropdownButton.propTypes = {
  name       : React.PropTypes.string.isRequired,
  disabled   : React.PropTypes.bool,
  icon       : React.PropTypes.string,
  onClick    : React.PropTypes.func,
  size       : React.PropTypes.oneOf(['standard', 'large']),
  variant    : React.PropTypes.oneOf(['accent', 'neutral', 'muted', 'plain'])
};

const STYLES = {
  base : {
    // done this way to avoid Radium warnings does not like mixing short and long hand
    borderBottomLeftRadius  : 2,
    borderBottomRightRadius : 2,
    borderTopLeftRadius     : 2,
    borderTopRightRadius    : 2,
    display                 : 'inline-block',
    fontSize                : 14,
    transition              : 'background-color .1s linear'
  },
  container : {
    display  : 'inline-block',
    position : 'relative'
  },
  variant : {
    accent : {
      backgroundColor : colors.accent.primary['500'],
      color           : colors.neutral['0'],
      ':hover' : {
        backgroundColor : colors.accent.primary['600']
      }
    },
    neutral : {
      backgroundColor : colors.neutral['600'],
      color           : colors.neutral['0'],
      ':hover' : {
        backgroundColor : colors.neutral['700']
      }
    },
    muted : {
      backgroundColor : colors.neutral['100'],
      color           : colors.neutral['800'],
      ':hover' : {
        backgroundColor : colors.neutral['200']
      }
    },
    plain : {
      backgroundColor : 'transparent',
      color           : colors.neutral['300'],
      ':hover' : {
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
    }
  },
  disabled     : {
    backgroundColor : colors.neutral['100'],
    color           : colors.neutral['200'],
    cursor          : 'not-allowed'
  },
  leftBtn : {
    borderTopLeftRadius    : 2,
    borderBottomLeftRadius : 2,
    padding                : `0 ${gu(3)}`
  },
  rightBtn : {
    borderBottomRightRadius : 2,
    borderTopRightRadius    : 2,
    marginLeft              : '1px',
    padding                 : `0 ${gu(2)}`
  },
  // Dropdown Styles
  dropdownContainer : {
    backgroundColor: colors.neutral['0'],
    border: '1px solid #e3eced',
    boxShadow: '0 2px 8px #e3eced',
    color: '#2b3b49',
    padding: '10px',
    position: 'absolute',
    right: '1px',
    top: '40px',
    width: '200px',
    zIndex: '50'
  },
  calloutArrow : {
    backgroundColor : 'white',
    height : '14px',
    position : 'absolute',
    right : '9px',
    top : '-7px',
    transform : 'rotate(45deg)',
    width : '14px'
  }
}
