/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-longleat-components',

  included: function(/* app */) {
    this._super.included.apply(this, arguments);
  },

  isDevelopingAddon: function() {
    return true;
  }
};
