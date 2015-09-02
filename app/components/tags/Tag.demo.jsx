import React from 'react';
import Radium from 'radium';

import MDHQBase, {autobind, NOOP} from '../base/Base';
import {gridUnits as gu, combineStyles, colors} from '../base/styleHelpers';

import Tag from '../tags/Tag';

const dummyTags = ['Top Charts', 'Feature', 'Top 10', 'Top 20', 'Low Rank', 'Keyword Suggestion', 'Tag 1', 'Long tag name here'];
const selectedTags = [];

const specialTags = {
  'Top Charts' : {
    background : '#184940',
    hover      : '#226659'
  },
  'Feature' : {
    background : '#00846b',
    hover      : '#00a888'
  },
  'Top 10' : {
    background : '#3fc7b0',
    hover      : '#94eddc'
  },
  'Top 20' : {
    background : '#ff8482',
    hover      : '#ffb3b3'
  },
  'Low Rank' : {
    background : '#e71336',
    hover      : '#ff5957'
  },
  'Keyword Suggestion' : {
    background : '#007aff',
    hover      : '#55aeff'
  }
};

@Radium
export default class MDHQTagsDemo extends MDHQBase {

  constructor(...props) {
    super(...props);
    this.state = {
      'tags'         : dummyTags,
      'selectedTags' : []
    };
  }

  @autobind
  _handelClick(tagClicked) {
    console.log(tagClicked, ' was selected');
    this.setState({
      'selectedTags' : this.state.selectedTags.concat([tagClicked])
    });
  }

  render() {
    let tagsHTML = this.state.tags.map((item, index) =>{
      return(
        <Tag
          key={index}
          name={item}
          onClick={()=> this._handelClick(item)}
          disabled={this.state.selectedTags.indexOf(item) > -1}
          backgroundColor={specialTags.hasOwnProperty(item) ? specialTags[item].background : colors.neutral[400]}
          hoverColor={specialTags.hasOwnProperty(item) ? specialTags[item].hover : colors.neutral[300]}/>
      );
    });

    return (
      <div>
        {tagsHTML}
      </div>
    );
  }
}