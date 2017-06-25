import Ember from 'ember';
import layout from './template';
const { Component, isEmpty, get } = Ember;

export default Component.extend({
  layout,

  tagName: 'button',

  actions: {
    onclick() {
      const onclick = get(this, 'onclick');
    
      if (isEmpty(onclick)) {
        return;
      }
      onclick();
    }
  },

  click() {
    this.send('onclick');
    return false;
  },
});
