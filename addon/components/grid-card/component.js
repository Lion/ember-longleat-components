import Ember from 'ember';
import layout from './template';

const { Component, computed, get } = Ember;

export default Component.extend({
  layout,
  classNames: ['grid-card'],

  sortedIcons: computed('icons', function() {
    return get(this, 'icons').sort();
  })
});
