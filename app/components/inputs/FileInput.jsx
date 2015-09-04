import React from 'react';
import Radium from 'radium';
import _ from 'lodash';

import MDHQBase, {autobind, NOOP} from '../base/Base';
import {gridUnits as gu, combineStyles, colors} from '../base/styleHelpers';

// TXL
import Export from 'txl/icons/icons/Export';
import Button from 'txl/buttons/Button';

@Radium
export default class FileInput extends MDHQBase {

  render() {
    return (
      <div style={STYLES.container}>
        <Button
          variant={this.props.variant}
          style={STYLES.button}>
          <Export color="white"/>
          <span style={STYLES.label}>
            {this.props.label}
          </span>
          <input
            accept={this.props.accept}
            className={this.props.className}
            disabled={this.props.disabled}
            name={this.props.name}
            onChange={this.props.onChange}
            style={STYLES.input}
            type="file"/>
        </Button>

      </div>
    );
  }
}

FileInput.propTypes = {
  'accept'       : React.PropTypes.string,
  'className'    : React.PropTypes.string,
  'disabled'     : React.PropTypes.bool,
  'filepath'     : React.PropTypes.string,
  'label'        : React.PropTypes.string,
  'name'         : React.PropTypes.string,
  'onChange'     : React.PropTypes.func,
  'showFilepath' : React.PropTypes.bool,
  'variant'      : React.PropTypes.string,
};

FileInput.getDefaultProps = {
  'accept'       : '*',
  'className'    : '',
  'disabled'     : false,
  'filepath'     : '',
  'label'        : 'Choose file...',
  'name'         : '',
  'onChange'     : NOOP,
  'showFilepath' : true,
  'variant'      : 'accent',
};

const STYLES = {
  button : {
    cursor : 'pointer',
  },

  container : {
    position : 'relative',
  },

  filename: {
    color : 'grey',
  },

  input : {
    cursor   : "pointer",
    height   : "100%",
    left     : 0,
    opacity  : 0,
    position : 'absolute',
    top      : 0,
    width    : '100%',
    zIndex   : 1,
  },

  label : {
    marginLeft  : "8px",
  }
}