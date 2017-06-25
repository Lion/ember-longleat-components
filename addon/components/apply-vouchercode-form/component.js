import Ember from 'ember';
import layout from './template';
const { Component, computed, get, isBlank, set } = Ember;
const { notEmpty } = computed;

export default Component.extend({
  layout,
  code: '',

  hasError: notEmpty('errorCode'),

  actions: {
    submit() {
      const code = get(this, 'code');
      if (isBlank(code)) {
        set(this, 'errorCode', 'IS_EMPTY');
        return;
      }

      this.applyVouchercode(code);
    }
  }
});
