import React from 'react';
import Radium from 'radium';
import _ from 'lodash';

import MDHQBase, {autobind, NOOP} from '../../components/base/Base';
import {gridUnits as gu, combineStyles, colors} from '../../components/base/styleHelpers';

// Components
import Select from '../../components/select/Select';

const testData = [
  {
    label : 'test',
    value  : 'testvalue'
  }
];

@Radium
export default class AppChooser extends MDHQBase {

  render() {
    let app = this.props.appsData.appsWithRegions;
    let regionLabels = [];
    let platformLabels = [];
    if(!_.isEmpty(this.props.appsData.appsWithRegions) && !_.isEmpty(this.props.selectedApp)){
      regionLabels = app[this.props.selectedApp.value].regions;
      platformLabels = app[this.props.selectedApp.value].platforms;
    }
    return (
      <div style={STYLES.appChooserContainer}>
        <div style={combineStyles(STYLES.select, STYLES.selectApp)}>
          <Select
            optionSelected={(item) => this.props.selectApp(item)}
            options={this.props.appsData.appLabels}
            placeholder={'Select an app'}
            value={this.props.selectedApp}/>
        </div>
        <div style={combineStyles(STYLES.select, STYLES.selectPlatform)}>
          <Select
            optionSelected={(item) => this.props.selectPlatform(item)}
            options={platformLabels}
            placeholder={'Select a platform'}
            value={this.props.selectedPlatform}/>
        </div>
        <div style={combineStyles(STYLES.select, STYLES.selectRegion)}>
          <Select
            optionSelected={(item) => this.props.selectRegion(item)}
            options={regionLabels}
            placeholder={'Select a region'}
            value={this.props.selectedRegion}/>
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