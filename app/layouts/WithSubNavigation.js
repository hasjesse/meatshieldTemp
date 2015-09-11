import React from 'react';
import Radium from 'radium';
import Reflux from 'reflux';
import { RouteHandler } from "react-router";

import MDHQBase, {autobind, NOOP} from '../components/base/Base';
import {gridUnits as gu, combineStyles, colors} from '../components/base/styleHelpers';

// Components
import Select from '../components/select/Select';

// Composites
import SideNavigation from '../composites/sideNavigation/SideNavigation';
import AppChooser from '../composites/appChooser/AppChooser';

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
    let userDataUnsubscribe;

    let afterUserLoaded = (userData, error) => {

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

  'supportDocs' : function() {
    window.open('http://support.mobileapptracking.com/forums');
  },

  'searchDocs' : function(searchQuery) {
    searchQuery = encodeURIComponent(searchQuery.value);
    window.open(
      `http://support.mobileapptracking.com/categories/search?utf8=%E2%9C%93&query=${searchQuery}`,
      'searchSupportDocs'
    );
  },

  render : function() {
    // TMC header links
    var productLinks = [
      {
        'name' : 'Attribution Analytics',
        'url'  : `https://login.mobileapptracking.com?redirectUrl=https://platform.mobileapptracking.com/handler/authentication/loginViaSessionToken`
      }
    ];
    return (
      <div data-component="LayoutWithSubNavigation">
        <div style={STYLES.navigationContainer}>
          <TMCNavigation
            companyName= {this.state.userData.context.account ? this.state.userData.context.account.name : ''}
            onAccountSettings = {NOOP}
            onLogoClick = {NOOP}
            onLogout={()=> console.log('logout')}
            onSearchSupportDocs = {this.searchDocs}
            onSupportDocs = {this.supportDocs}
            productLinks= {productLinks}
            sessionToken = {this.state.userData.sessionToken}
            type='app' />
        </div>
        <div style={STYLES.sideNavContainer}>
          <SideNavigation product="TMC"/>
        </div>
        <div style={STYLES.pageContainer}>
          <AppChooser
            appsData={this.state.appsData}/>
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
    zIndex   : '99'
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
    zIndex    : '99'
  },
  contentContainer : {
    padding : gu(4),
    width   : '100%'
  }
};
