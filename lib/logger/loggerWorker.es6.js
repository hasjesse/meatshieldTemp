var logs = [];

var broadcastUpdate = () => {
  self.postMessage({
    'messageType' : 'logsUpdated'
  });
};

var logMatches = (log, params) => {
  var rightLevel = params.activeLevels[0] === '_all';
  if (!rightLevel) {
    params.activeLevels.forEach(level => {
      if (level === log.metadata.type) {
        rightLevel = true;
      }
    });
  }
  var rightSearch = !params.searchQuery.length ||
    (log.logData.message.toLowerCase().indexOf(params.searchQuery.toLowerCase()) > -1);

  // in Lodash, right now not worth shipping lodash just for _.contains:
  // var rightLevel = params.activeLevels[0] === '_all' || _.contains(params.activeLevels, log.metadata.type);
  // var rightSearch = !params.searchQuery.length ||
  //   (log.logData.message.toLowerCase().indexOf(params.searchQuery.toLowerCase()) > -1);

  return rightLevel && rightSearch;
};

var getLogs = (params, inverse=false) => {
  var toReturn = [];

  logs.forEach(log => {
    var isMatch = logMatches(log, params);

    if ((isMatch && !inverse) || (!isMatch && inverse)) {
      toReturn.push(log);
    }
  });

  return toReturn;
};


var clearPertinentLogs = params => {
  logs = getLogs(params, true);
};

self.addEventListener('message', function(event) {

  var actions = {
    'addLog' : e => {
      delete e.data.messageType;

      // data should resemble { metadata : object, logData : object }
      logs.unshift(e.data);

      broadcastUpdate();
    },

    'retrieveLogs' : e => {
      self.postMessage({
        'messageType'  : 'returnLogs',
        'logs'         : getLogs(e.data.params)
      });
    },

    'clearLogs' : e => {
      clearPertinentLogs(e.data.params);
      broadcastUpdate();
    }
  };

  if (actions[event.data.messageType]) {
    actions[event.data.messageType](event);
  }

}, false);
