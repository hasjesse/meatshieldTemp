import Reflux from 'reflux';
import request from 'superagent';
import prefix from 'superagent-prefix';

var Actions = Reflux.createActions({
  loadAppsWithRegions : {children : ['completed', 'failed']},
  setSelectedApp      : {},
  updateSelectedApp   : {}
});

Actions.loadAppsWithRegions.listen(function(userData) {
  request
    .get('/api/v2/users/apps')
    .use(prefix('http://localhost:8000'))
    .query({
      'mdhq_session_token' : userData.sessionToken
    }).end(this.completed);
});



module.exports = Actions;
