var _ = require('lodash');

var {formatMessage, prettyPrint} = require('./loggerFormatterHelpers');
// var Worker = require('worker!./loggerWorker');

// var loggerWorker;

var logRetrievalPromise;
var logRetrievalResolver;

class Logger {

  constructor() {
    this.idCounter = 0;
    this.subscribers = [];
  }

  generateId() {
    return this.idCounter++;
  }

  delegate(type, logData) {

    // if we don't clone, we risk accidentally mutating something in logData
    logData = _.clone(logData, true);

    if (!_.isObject(logData) || _.isUndefined(logData.message)) {
      logData = {
        message : logData,
        extra   : {}
      };
    }

    if (_.isObject(logData.message)) {
      logData.message = formatMessage(logData.message);
    }
    if (!_.isEmpty(logData.extra)) {
      // logData.extra is expected be an object of key => value, where:
      // key is the header label
      // value is shown in <code> (hence, the prettyPrint for formatting)
      _.each(logData.extra, (value, key) => {
        logData.extra[key] = prettyPrint(value);
      });
    }

    // loggerWorker.postMessage({
    //   'messageType' : 'addLog',
    //   'metadata'    : {
    //     'id'        : this.generateId(),
    //     'type'      : type,
    //     'time'      : new Date()
    //   },
    //   'logData'     : logData
    // });
  }

  log(logData) {
    this.delegate('log', logData);
  }

  info(logData) {
    this.delegate('info', logData);
  }

  warn(logData) {
    this.delegate('warn', logData);
  }

  error(logData) {
    this.delegate('error', logData);
  }

  // TODO revisit this as there may be race conditions
  getLogs(queryParams={}) {
    if (logRetrievalPromise) {
      return logRetrievalPromise;
    }

    logRetrievalPromise = new Promise(resolve => {
      logRetrievalResolver = resolve;
    });

    // loggerWorker.postMessage({
    //   'messageType' : 'retrieveLogs',
    //   'params'      : queryParams
    // });

    return logRetrievalPromise;
  }

  clear(queryParams={}) {
    // loggerWorker.postMessage({
    //   'messageType' : 'clearLogs',
    //   'params'      : queryParams
    // });
  }

  subscribe(callback=Function.prototype) {
    this.subscribers.push(callback);
  }

  unsubscribe(callback=Function.prototype) {
    this.subscribers = _.without(this.subscribers, callback);
  }
}

var logger = new Logger();

// publicly accessible path
// loggerWorker = new Worker;

var actions = {
  'logsUpdated' : () => {
    // publish change to all subscribers
    logger.subscribers.forEach(subscriber => subscriber());
  },

  'returnLogs' : e => {
    logRetrievalResolver(e.data.logs);
    logRetrievalPromise = null;
  }
};

// loggerWorker.addEventListener('message', e => {
//   if (actions[e.data.messageType]) {
//     actions[e.data.messageType](e);
//   }
// }, false);

// loggerWorker.addEventListener('error', e => {
//   console.error(`ERROR: Line ${e.lineno} in ${e.filename}: ${e.message}`);
// }, false);

module.exports = logger;
