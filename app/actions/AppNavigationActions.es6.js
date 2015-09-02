import Reflux from 'reflux';
import request from 'superagent';
import prefix from 'superagent-prefix';

var Actions = Reflux.createActions({
  loadAppsWithRegions : {children : ['completed', 'failed']},
});

Actions.loadAppsWithRegions.listen(function() {
  request
    .get('/api/v2/users/apps')
    .use(prefix('http://localhost:9000'))
    .end(this.completed);
});

module.exports = Actions;
