import React from 'react';
import Radium from 'radium';

import MDHQBase, {autobind, NOOP} from '../base/Base';
import {gridUnits as gu, combineStyles, colors} from '../base/styleHelpers';

// Components
import Select from '../select/Select';

const testData = [
  {
    label : 'test',
    value  : 'testvalue'
  }
];

@Radium
export default class AppChooser extends MDHQBase {

  constructor(...props) {
    super(...props);
    this.state = {
      selectedApp : {}
    };
  }

  render() {

    return (
      <div style={STYLES.appChooserContainer}>
        <div style={combineStyles(STYLES.select, STYLES.selectApp)}>
          <Select
            optionSelected={(item) => console.log(item)}
            options={testData}
            placeholder={'Select an app'} />
        </div>
        <div style={combineStyles(STYLES.select, STYLES.selectPlatform)}>
          <Select
            optionSelected={(item) => console.log(item)}
            options={testData}
            placeholder={'Select a platform'} />
        </div>
        <div style={combineStyles(STYLES.select, STYLES.selectRegion)}>
          <Select
            optionSelected={(item) => console.log(item)}
            options={testData}
            placeholder={'Select a region'} />
        </div>
      </div>
    );
  }
}

AppChooser.defaultProps = {

};

AppChooser.propTypes = {

};

const STYLES = {
  appChooserContainer : {
    alignItems : 'center',
    background : colors.neutral[100],
    display    : 'flex',
    height     : gu(9),
    padding    : `0 ${gu(4)}`,
    width      : '100%'
  },
  select : {
    background : colors.neutral[0],
    flex : '1 0 auto',
    margin : `0 ${gu(1)}`
  },
  selectApp : {
    maxWidth : '300px'
  },
  selectPlatform : {
    maxWidth : '150px'
  },
  selectRegion : {
    maxWidth : '150px'
  }
};