/* global ga */
import Ember from 'ember';
import layout from './template';
const { Component, computed, get, isEmpty, isPresent } = Ember;
const { equal, not, or } = computed;

export default Component.extend({

  layout,
  tagName: 'button',

  classNameBindings: [
    ':ui-button',
    'isLoading:is-loading',
    'size',
    'themeClass'
  ],
  attributeBindings: ['disabled'],
  trackEvent: null,
  disabled: or('isDisabled', 'isLoading'),
  isSubmitButton: equal('type', 'submit'),
  isNotSubmitButton: not('isSubmitButton'),

  actions: {
    onclick() {
      const trackEvent = get(this, 'trackEvent');
      const onclick = get(this, 'onclick');
      if (isPresent(trackEvent)) {
        ga(
          'send',
          'event',
          get(trackEvent, 'category'),
          get(trackEvent, 'action'),
          get(trackEvent, 'label'),
          get(trackEvent, 'value')
        );
      }

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
