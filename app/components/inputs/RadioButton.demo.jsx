import React from 'react';
import RadioButton from 'mdhq-components/inputs/RadioButton';
import Radium from 'radium';
import MDHQBase, {autobind} from 'mdhq-components/base/Base';

var dummyRadiobuttons = [
  {
    name : 'Radio One',
    label : 'Radio One',
    checked : false
  },
  {
    name : 'Radio Two',
    label : 'Radio Two',
    checked : true
  },
  {
    name : 'Radio Three',
    label : 'Radio Three',
    checked : false
  }
];

@Radium
@autobind
export default class MDHQRadioButtonDemo extends MDHQBase {

  constructor(...props) {
    super(...props);
    this.setState({
      'radiobuttons' : dummyRadiobuttons
    })
  }

  _handleRadioClick (e, item, index) {
    console.log('radio clicked: ', item);
    dummyRadiobuttons.map(dummyRadiobutton => dummyRadiobutton.checked = false);
    dummyRadiobuttons[index].checked = true;
    this.setState({
      'radiobuttons' : dummyRadiobuttons
    })
  }

  render() {
    var radioButtonHTML = this.state.radiobuttons.map((item, index) => {
      return(
          <RadioButton
              key={index}
              name={item.name}
              label={item.label}
              onChange={(e) => this._handleRadioClick(e, item, index)}
              checked={item.checked} />
      );
    });

    return (
      <div>
        {radioButtonHTML}
      </div>
    );
  }
}