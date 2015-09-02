var _ = require('lodash');

function flattenColorObject(data, isNested) {
  var retObj = {};
    var colorPrefix = isNested ? '' : 'color-';

    _.forEach(data, function(section, key) {
      if (_.isPlainObject(section)) {
        var recursiveFlatObject = flattenColorObject(section, true);

        _.forEach(recursiveFlatObject, function(subSection, subKey) {
          retObj[colorPrefix + key + '-' + subKey] = subSection;
        });
      } else if (_.isArray(section)) {
        _.forEach(section, function(subSection, subKey) {
          retObj[colorPrefix + key + '-' + (subKey + 1)] = subSection;
        });
      } else {
        retObj[key] = section;
      }
    });

    return retObj;
}

function getColorsForLess() {
  var colors = require('matstyle/less/colors');
  return flattenColorObject(colors);
}

function getLessOptions() {
  return {
    strictMath: 'on',
    dumpLineNumbers: 'comments',
    globalVars: getColorsForLess()
  };
}

function getLessLoaders(env) {
  env = env || 'development';
  var cssLoaders = env === 'production' ?
    ['style', 'css?minimize'] :
    ['style', 'css'];
  return cssLoaders.concat([
    'autoprefixer?browsers=last 2 version',
    'remove-less-silent-placeholders',
    'rem-to-pixel?rem=5',
    'less?' + JSON.stringify(getLessOptions()),
    'prepend-less-imports'
  ]);
}

module.exports = getLessLoaders;
