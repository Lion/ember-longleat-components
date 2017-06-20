/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-longleat-components',

  included: function(app, parentAddon ) {
    this._super.included.apply(this, arguments);

    var target = (parentAddon || app);
    target.options.sassOptions = target.options.sassOptions || {};

    target.options.sassOptions.includePaths = target.options.sassOptions.includePaths || [
      'node_modules/bourbon/app/assets/stylesheets/',
      'node_modules/bourbon-neat/core/',
      'node_modules/bourbon-neat/contrib/'
    ];

  },

  isDevelopingAddon: function() {
    return true;
  }
};
