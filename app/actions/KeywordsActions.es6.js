import Reflux from 'reflux';
import request from 'superagent';
import prefix from 'superagent-prefix';

var Actions = Reflux.createActions({
  postKeywordsForm    : {children : ['completed', 'failed']},
});

Actions.postKeywordsForm.listen(function(data) {
  //TODO: hook up info for current context
  //i.e. App/Region/Platform currently selected
  request
    .post('/api/v2/users/apps/123456/user_reports/bulk')
    .send(data)
    .use(prefix('http://localhost:9000'))
    .end(function(err, res){
      if (res.ok) {
        alert('yay got ' + JSON.stringify(res.body));
      } else {
        alert('Oh no! error ' + res.text);
      }
    });
  // TODO: hook up to real data
  return this.completed();
});

module.exports = Actions;
