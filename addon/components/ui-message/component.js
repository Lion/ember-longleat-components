import Ember from 'ember';
import layout from './template';
const { Component, computed, get } = Ember;

export default Component.extend({
  layout,

  classNameBindings: [
    ':component-ui-message',
    'themeClass',
    'hasBottomMargin',
    'isCentered'
  ],
  theme: 'default',
  themeClass: computed(
    'theme',
    function() {
      return 'theme-' + get(this, 'theme');
    }
  )
});
