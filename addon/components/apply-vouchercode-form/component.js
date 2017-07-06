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
      const code = get(this, 'code').trim();

      if (isBlank(code)) {
        set(this, 'errorCode', 'IS_EMPTY');
        return;
      }

      console.log(code.substring(0,2));

      if (code == 'CGCW994HPV') {
        set(this, 'errorCode', 'IS_TESCO');
        return;
      }

      this.applyVouchercode(code);
    }
  }
});
