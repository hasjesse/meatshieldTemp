import React from 'react';

import 'core-js/modules/es6.reflect.own-keys'; // polyfill is required for autobind decorator
import autobind from 'autobind-decorator';

export default class MDHQBase extends React.Component {
  constructor(...args) {
    super(...args);
  }
}

export {autobind as autobind};
export const NOOP = function() {};