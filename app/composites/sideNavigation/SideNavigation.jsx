import React from 'react';
import Radium from 'radium';
import clone from 'lodash/lang/clone';

import MDHQBase, {autobind, NOOP} from '../../components/base/Base';
import {gridUnits as gu, combineStyles, colors} from '../../components/base/styleHelpers';

// TXL
import ArrowLeft from 'txl/icons/icons/ArrowLeft';
import MeterOutline from 'txl/icons/icons/MeterOutline';
import GraphBar2 from 'txl/icons/icons/GraphBar2';
import FlagOutline from 'txl/icons/icons/FlagOutline';
import CompassOutline from 'txl/icons/icons/CompassOutline';
import Navigation from 'txl/navigation/Navigation';

const NAV_ITEMS = [
  {
    icon     : ArrowLeft,
    display  : 'Back to All Apps',
    name     : 'back-to-all-apps'
  },
  {
    display  : 'Rankings',
    icon     : MeterOutline,
    name     : 'rankings',
    items    : [
      {
        display : 'Top Charts & Keywords',
        href    : '#',
        name    : 'top-charts-and-keywords'
      }
    ]
  },
  {
    icon     : GraphBar2,
    display  : 'Downloads',
    name     : 'downloads'
  },
  {
    icon     : MeterOutline,
    display  : 'Competitors',
    name     : 'competitors'
  },
  {
    icon     : MeterOutline,
    display  : 'Ratings and Reviews',
    name     : 'ratings-and-reviews'
  },
  {
    icon     : FlagOutline,
    display  : 'Alerts',
    name     : 'alerts'
  },
  {
    icon     : MeterOutline,
    display  : 'Sonar',
    name     : 'sonar'
  }
];

export default class MdhqSideNav extends MDHQBase {
  constructor(...args) {
    super(...args);
    let items = clone(NAV_ITEMS, true);
    items.forEach(navSection => {
      navSection.onClick = this._handleClick.bind(this, navSection.name);
    });

    this.state = {
      items         : items,
      activeNames   : ['top-charts-and-keywords'],
      expandedNames : ['rankings']
    };
  }

  _handleClick(name) {
    let expandedNames = clone(this.state.expandedNames);
    let foundIndex = expandedNames.indexOf(name);

    if (foundIndex > -1) {
      expandedNames.splice(foundIndex, 1);
    } else {
      expandedNames.push(name);
    }
    this.setState({expandedNames});
  }

  render() {
    return (
      <Navigation
        product={this.props.product}
        activeNames={this.state.activeNames}
        expandedNames={this.state.expandedNames}
        items={this.state.items} />
    )
  }
}