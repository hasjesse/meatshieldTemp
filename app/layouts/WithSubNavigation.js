import React from 'react';
import Radium from 'radium';
import Reflux from 'reflux';
import { RouteHandler } from "react-router";

import MDHQBase, {autobind, NOOP} from '../components/base/Base';
import {gridUnits as gu, combineStyles, colors} from '../components/base/styleHelpers';

// Components
import Select from '../components/select/Select';
import AppChooser from '../components/appChooser/AppChooser';

// Composites
import SideNavigation from '../composites/sideNavigation/SideNavigation';

// Delphi
import TMCNavigation from 'delphi/TMC/TMCNavigation';

// TXL
import Gear from 'txl/icons/icons/Gear';
import Button from 'txl/buttons/Button';
import IconButton from 'txl/buttons/IconButton';

// Stores
import AppNavigationStore from '../stores/AppNavigationStore';
import UserStore from '../stores/UserStore';

// Actions
import RankingsActions from '../actions/RankingsActions';
import AppNavigationActions from '../actions/AppNavigationActions';

module.exports = Radium(React.createClass ({
  displayName : 'WithSubNavigation',
  mixins      : [
    Reflux.connect(AppNavigationStore, 'appsData'),
    Reflux.connect(UserStore, 'userData')
  ],

  getInitialState : function () {
    return {
      appsData: AppNavigationStore.getExposedData(),
      userData: UserStore.getExposedData(),
    };
  },

  componentWillMount : function() {
    this._bootstrapRankingsPage();
  },

  _bootstrapRankingsPage : function () {
    var userDataUnsubscribe;

    var afterUserLoaded = (userData, error) => {

      if (window.loadingStateMessage) {
        window.loadingStateMessage.set('Loading Apps...');
      }

      AppNavigationActions.loadAppsWithRegions();

      if (userDataUnsubscribe) {
        userDataUnsubscribe();
      }
    };

    if (_.isEmpty(UserStore.getExposedData().context.account)) {
      userDataUnsubscribe = UserStore.listen(afterUserLoaded);
    } else {
      afterUserLoaded(UserStore.getExposedData());
    }
  },

  render : function() {
    // TMC header links
    let productLinks = [
      {
        'name' : 'Mobile App Tracking',
        'url'  : `https://login.mobileapptracking.com?redirectUrl=https://platform.mobileapptracking.com/handler/authentication/loginViaSessionToken`
      }
    ];

    return (
      <div data-component="LayoutWithSubNavigation">
        <div style={STYLES.navigationContainer}>
          <TMCNavigation
            productLinks= {productLinks}
            companyName= {'test'}
            onLogout={NOOP}/>
        </div>
        <div style={STYLES.sideNavContainer}>
          <SideNavigation product="TMC"/>
        </div>
        <div style={STYLES.pageContainer}>
          <AppChooser />
          <RouteHandler />
        </div>
      </div>
    );
  }
}));

const STYLES = {
  navigationContainer : {
    position : 'fixed',
    width    : '100%',
    zIndex   : '9999'
  },
  pageContainer : {
    display       : 'flex',
    flexDirection : 'column',
    marginLeft    : gu(40),
    maxWidth      : '1600px',
    minWidth      : '1000px',
    position      : 'relative',
    top           : gu(13)
  },
  sideNavContainer : {
    position  : 'fixed',
    top       : gu(13),
    width     : '200px',
    zIndex    : '9999'
  },
  contentContainer : {
    padding : gu(4),
    width   : '100%'
  }
};
