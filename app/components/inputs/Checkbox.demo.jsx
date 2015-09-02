import React from 'react';
import Checkbox from 'mdhq-components/inputs/Checkbox';
import Radium from 'radium';
import MDHQBase, {autobind} from 'mdhq-components/base/Base';

var dummyCheckboxes = [
  {
    name : 'Check One',
    label : 'Check One',
    checked : false
  },
  {
    name : 'Check Two',
    label : 'Check Two',
    checked : true
  },
  {
    name : 'Check Three',
    label : 'Check Three',
    checked : false
  }
];

@Radium
@autobind
export default class MDHQCheckboxDemo extends MDHQBase {

  constructor(...props) {
    super(...props);
    this.state = {
      'checkboxes' : dummyCheckboxes
    };
  }

  _handelCheckSelect(e, item, index) {
    console.log('check clicked: ', item);
    dummyCheckboxes[index].checked = !dummyCheckboxes[index].checked;
    this.setState({
      'checkboxes' : dummyCheckboxes
    })
  }

  render() {
    var checkboxHTML = this.state.checkboxes.map((item, index) => {
      return(
        <Checkbox
          key={index}
          name={item.name}
          label={item.label}
          onChange={(e) => this._handelCheckSelect(e, item, index)}
          checked={item.checked} />
      );
    });

    return (
      <div>
        {checkboxHTML}
      </div>
    );
  }
}