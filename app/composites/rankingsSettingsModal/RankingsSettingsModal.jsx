import React from 'react';
import Radium from 'radium';
import _ from 'lodash';

import MDHQBase, {autobind, NOOP} from '../../components/base/Base';
import {gridUnits as gu, combineStyles, colors} from '../../components/base/styleHelpers';

// Components
import Modal from '../../components/modal/Modal';

// TXL
import {Gear} from 'txl/icons/Icons';
import IconButton from 'txl/buttons/IconButton';
import Checkbox from 'txl/input-fields/Checkbox';

@Radium
export default class MDHQRankingsTableSettingsModal extends MDHQBase {

  constructor(...props) {
    super(...props);
    this.state = {
      showModal      : false,
      tableSettings  : []
    };
  }

  @autobind
  toggleModal() {
    this.setState({
      showModal     : !this.state.showModal,
      tableSettings : this.props.tableSettings
    });
  }

  @autobind
  settingClicked(settingClicked) {
    // clones settings so that if you close the modal it can be reset to the prop
    let currentSettings = _.cloneDeep(this.state.tableSettings);
    currentSettings.forEach((setting) =>{
      if(setting.name === settingClicked.name){
        setting.checked = !setting.checked
      }
    });
    this.setState({
      tableSettings : currentSettings
    });
  }

  render() {
    // Breaks settings check mark data into 2 columns
    let colOne = this.state.tableSettings.slice(0, Math.ceil(this.state.tableSettings.length / 2));
    let colTwo = this.state.tableSettings.slice(Math.ceil(this.state.tableSettings.length / 2), this.state.tableSettings.length);

    return (
      <div>
        <IconButton
          onClick={this.toggleModal}
          variant="muted"
          icon={Gear}/>
        <Modal
          blindClick={this.toggleModal}
          cancelClick={this.toggleModal}
          confirmClick={() => {this.props.settingChanged(this.state.tableSettings); this.toggleModal();}}
          confirmText="Apply"
          showModal={this.state.showModal}
          title="Table Settings">
          <div style={STYLES.checkmarkContainer}>
            <ul style={STYLES.checkmarkList}>
              {colOne.map((setting, index) => {
                return(
                  <li key={index}>
                    <Checkbox
                      checked={setting.checked}
                      disabled={false}
                      labelText={setting.label}
                      name={setting.label}
                      onChange={() => this.settingClicked(setting)}
                      value={setting.label} />
                  </li>
                );
              })}
            </ul>
            <ul style={STYLES.checkmarkList}>
              {colTwo.map((setting, index) => {
                return(
                  <li key={index}>
                    <Checkbox
                      checked={setting.checked}
                      disabled={false}
                      labelText={setting.label}
                      name={setting.label}
                      onChange={() => this.settingClicked(setting)}
                      value={setting.label} />
                  </li>
                );
              })}
            </ul>
          </div>
        </Modal>
      </div>
    );
  }
}

MDHQRankingsTableSettingsModal.defaultProps = {
  settingChanged : NOOP,
  tableSettings  : []
};

MDHQRankingsTableSettingsModal.propTypes = {
  settingChanged : React.PropTypes.func,
  tableSettings  : React.PropTypes.array
};

const STYLES = {
  checkmarkContainer : {
    display : 'flex',
    marginTop : gu(4)
  },
  checkmarkList : {
    listStyle : 'none',
    width : '50%'
  }
};