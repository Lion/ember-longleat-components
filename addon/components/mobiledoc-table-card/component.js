import Ember from 'ember';
import layout from './template';
const { Component, computed, get } = Ember;

export default Component.extend({
  layout,
  rows: computed(
    'payload.rows',
    function() {
      return JSON.parse(get(this, 'payload.rows'));
    }
  )
});
