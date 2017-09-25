import Ember from 'ember';
import layout from './template';
const { Component, computed, get, isEmpty } = Ember;

let component = Component.extend({
  layout,
  classNames: ['component-ui-label-value'],

  safeLabelWidth: computed(
    'labelWidth',
    function() {
      if (isEmpty(get(this, 'labelWidth'))) {
        return Ember.String.htmlSafe('');
      }
      return Ember.String.htmlSafe(
        'width: ' + get(this, 'labelWidth') + ";"
      );
    }
  ),

  safeMarginLeft: computed(
    'labelWidth',
    function() {
      if (isEmpty(get(this, 'labelWidth'))) {
        return Ember.String.htmlSafe('');
      }
      return Ember.String.htmlSafe(
        'margin-left: ' + get(this, 'labelWidth') + ";"
      );
    }
  )
});

component.reopenClass({
  positionalParams: ['label']
});

export default component;