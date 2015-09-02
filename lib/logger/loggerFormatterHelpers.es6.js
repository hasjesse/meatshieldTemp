// https://raw.github.com/douglascrockford/JSON-js/master/cycle.js
if (typeof JSON.decycle !== 'function') {
  JSON.decycle = function decycle(object) {

    // Make a deep copy of an object or array, assuring that there is at most
    // one instance of each object or array in the resulting structure. The
    // duplicate references (which might be forming cycles) are replaced with
    // an object of the form
    //      {$ref: PATH}
    // where the PATH is a JSONPath string that locates the first occurance.
    // So,
    //      var a = [];
    //      a[0] = a;
    //      return JSON.stringify(JSON.decycle(a));
    // produces the string '[{"$ref":"$"}]'.

    // JSONPath is used to locate the unique object. $ indicates the top level of
    // the object or array. [NUMBER] or [STRING] indicates a child member or
    // property.

    var objects = [], // Keep a reference to each unique object or array
      paths = [];     // Keep the path to each unique object or array

    return (function derez(value, path) {
      var i,          // The loop counter
        name,         // Property name
        nu;           // The new object or array

      if (typeof value === 'object' && value !== null &&
          !(value instanceof Boolean) &&
          !(value instanceof Date) &&
          !(value instanceof Number) &&
          !(value instanceof RegExp) &&
          !(value instanceof String)) {
        for (i = 0; i < objects.length; i += 1) {
          if (objects[i] === value) {
            return {$ref: paths[i]};
          }
        }

        objects.push(value);
        paths.push(path);

        if (Object.prototype.toString.apply(value) === '[object Array]') {
          nu = [];
          for (i = 0; i < value.length; i += 1) {
            nu[i] = derez(value[i], path + '[' + i + ']');
          }
        } else {
          nu = {};
          for (name in value) {
            if (Object.prototype.hasOwnProperty.call(value, name)) {
              nu[name] = derez(value[name],
                path + '[' + JSON.stringify(name) + ']');
            }
          }
        }
        return nu;
      }
      return value;
    }(object, '$'));
  };
}

var jsonHelper = {
  key : '<span class=json-key>',
  val : '<span class=json-value>',
  str : '<span class=json-string>',

  replacer : function(match, indent, key, val, end) {
    var ret = indent || '';
    if (key) {
      ret = ret + jsonHelper.key + key.replace(/[": ]/g, '') + '</span>: ';
    }
    if (val) {
      ret = ret + (val[0] === '"' ? jsonHelper.str : jsonHelper.val) + val + '</span>';
    }
    return ret + (end || '');
  },

  prettyPrint : function(obj) {
    var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg,
        jsonString = JSON.stringify(JSON.decycle(obj), null, 2);

    if (!_.isString(jsonString)) {
      return 'undefined';
    }

    return jsonString
      .replace(/\\n/g, '\n')
      .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(jsonLine, jsonHelper.replacer);
  }
};

var format = function(arg) {
  if (arg instanceof Error) {
    if (arg.stack) {
      if (arg.message && arg.stack.indexOf(arg.message) === -1) {
        return 'Error: ' + arg.message + '\n' + arg.stack;
      } else {
        return arg.stack;
      }
    } else if (arg.sourceURL) {
      return arg.message + '\n' + arg.sourceURL + ':' + arg.line;
    }
  }
  if (typeof arg == 'string') {
    return arg.replace(/\\n/g, '\n');
  }
  return arg;
};

module.exports.prettyPrint = obj => jsonHelper.prettyPrint(obj);
module.exports.formatMessage = message => format(JSON.stringify(JSON.decycle(message)));
