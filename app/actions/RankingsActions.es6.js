import Reflux from 'reflux';
import request from 'superagent';
import prefix from 'superagent-prefix';

var defaultTableSettings = [
  {
    checked : true,
    label   : 'Current Rank',
    name    : 'Rank',
    styles  : 'rankCell'
  },
  {
    checked : true,
    label : 'Difficulty',
    name : 'Difficulty',
    styles : 'difficultyCell'
  },
  {
    checked : true,
    label : 'Volume',
    name : 'Volume',
    styles : 'volumeCell'
  },
  {
    checked : true,
    label   : 'Estimated Installs',
    name    : 'Est. Installs',
    styles  : 'installsCell'
  },
  {
    checked : true,
    label   : '% of Organic Installs',
    name    : '% of Organic Installs',
    styles  : 'organicCell'
  }
];

var Actions = Reflux.createActions({
  addTagsToKeywords         : {children : ['completed', 'failed']},
  graphKeyword              : {},
  loadRankingsTable         : {children : ['completed', 'failed']},
  loadRankingsTableFilters  : {},
  loadRankingsTableSettings : {children : ['completed', 'failed']},
  removeTagsFromKeywords    : {children : ['completed', 'failed']},
  selectAllRows             : {},
  selectRow                 : {},
  selectTag                 : {},
  selectTagDropdown         : {},
  setAddTags                : {},
  setTableSize              : {},
  settingsChanged           : {children : ['completed', 'failed']},
  stopTrackingKeywords      : {children : ['completed', 'failed']}
});

Actions.loadRankingsTable.listen(function() {
  // http://localhost:8000/api/v2/users/apps/324684580/rankings/table?mdhq_session_token=389675749c37a075ed2d1fd924b9bf99ed2c2a5e&region[iso_code]=us&platform[id]=1&end_datetime=2015-07-18&start_datetime=2015-01-22
  request
    .get('/api/v2/users/apps/324684580/rankings/table')
    .use(prefix('http://localhost:8000'))
    .query({'mdhq_session_token' : "389675749c37a075ed2d1fd924b9bf99ed2c2a5e"})
    .query({'region[iso_code]'   : 'us'})
    .query({'platform[id]'       : '1'})
    .query({'end_datetime'       : '2015-07-18'})
    .query({'start_datetime'     : '2015-01-18'})
    .end((err, res) => {
      return this.completed(res.body);
    });
});

Actions.loadRankingsTableSettings.listen(function() {
  // TODO: hook up to real data
  return this.completed(defaultTableSettings);
});

Actions.stopTrackingKeywords.listen(function(keywords) {
  // TODO: hook up to real data
  //return this.completed(tableSettings);
  console.log('stop traking: ', keywords)
});

Actions.addTagsToKeywords.listen(function(keywords, tags) {
  // TODO: hook up to real data
  //return this.completed(tableSettings);
  console.log('add tags to: ', keywords);
  console.log('add these tags: ', tags);
});

Actions.removeTagsFromKeywords.listen(function(keywords) {
  // TODO: hook up to real data
  //return this.completed(tableSettings);
  console.log('remove tags from: ', keywords);
});

Actions.settingsChanged.listen(function(settings) {
  // make call to set new settings
  return this.completed(settings);
});

Actions.graphKeyword.listen(function(item) {
  // TODO: hook up to real data
  //return this.completed(tableSettings);
  console.log('graph this: ', item);
});

module.exports = Actions;
