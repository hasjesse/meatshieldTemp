var Reflux = require('reflux');
var _ = require('lodash');
var AppNavigationActions = require('../actions/AppNavigationActions');

var AppNavigationStore = Reflux.createStore({

  'listenables' : AppNavigationActions,

  init : function() {
    this.appsWithRegions = [];
    this.appLabels       = [];
    this.navSelections   = {};
  },

  onLoadAppsWithRegionsCompleted : function(err, res) {
    if(err) {
      console.log(err);
      return;
    }

    let apps = {};
    let appLabels = [];
    res.body.forEach((item) => {
      app = {
        name: item.name,
        regions: item.regions
      };
      // Setup platform for select
      let platforms = [];
      item.platform.forEach((platform) => {
        platforms.push({'label': platform.name, 'value': platform.id.toString()});
      });
      app["platforms"] = platforms;
      // Setup region for select
      let regions = [];
      item.regions.forEach((region) => {
        regions.push({'label': region.name, 'value': region.iso_code});
      });
      app["regions"] = regions;

      apps[item.source_id] = app;

      appLabels.push({ 'label': item.name, 'value': item.source_id });
    });

    this.appsWithRegions = apps;
    this.appLabels = appLabels;
    this.emitChange();
  },

  setSelectedApp : function() {
    this.navSelections = {
      selectedApp      : {label: 'Spotify Music', value: '324684580'},
      selectedPlatform : {label: 'iPhone', value: '1'},
      selectedRegion   : {label: 'United States', value: 'us'},
    };
    this.emitChange();
  },

  emitChange : function(action) {
    this.trigger(this.getExposedData(), action);
  },

  getExposedData : function() {
    return {
      appsWithRegions: this.appsWithRegions,
      appLabels: this.appLabels,
      navSelections : this.navSelections
    };
  }
});

module.exports = AppNavigationStore;