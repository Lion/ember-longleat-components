import Ember from 'ember';
import layout from './template';
const { Component, isPresent, computed, get, set } = Ember;
const { alias, and, empty, filterBy, equal, not, notEmpty, or, sort } = computed;

export default Component.extend({
  layout,

  isVouchercodeFieldShowable: false,

  isBasketEmpty: empty('basketItems'),
  hasBasketItems: notEmpty('basketItems'),
  isShowingRemoveVouchercode: alias('hasVouchercode'),
  hasVouchercode: notEmpty('vouchercode.content'),
  hasNoVouchercode: not('hasVouchercode'),
  hasAPVoucherCode: equal('vouchercode.content.code', 'ANNUALPASSHOLDER'),
  visibleBasketItems: filterBy("basketItems", "isHidden", false),

  isShowingApplyVouchercode: and(
    'isVouchercodeFieldShowable',
    'hasNoVouchercode'
  ),

  isShowingVouchercodeField: or(
    'isVouchercodeFieldShowable',
    'hasVouchercode'
  ),

  init() {
    this._super(...arguments);
    set(this, 'code', '');
    if (isPresent(get(this, 'vouchercode'))) {
      set(this, 'code', get(this, 'vouchercode.code'));
    }
  },

  actions: {
    showVouchercodeField() {
      set(this, 'isVouchercodeFieldShowable', true);
    },
  }
});
