import Ember from 'ember';
import layout from './template';
const { Component, isPresent, computed, get, isEmpty, set } = Ember;
const { alias, and, empty, filter, equal, not, notEmpty, or } = computed;

export default Component.extend({
  layout,

  isVouchercodeFieldShowable: false,

  isBasketEmpty: empty('basketItems'),
  hasBasketItems: notEmpty('basketItems'),
  isShowingRemoveVouchercode: alias('hasVouchercode'),
  hasVouchercode: notEmpty('vouchercode.content'),
  hasNoVouchercode: not('hasVouchercode'),
  hasAPVoucherCode: equal('vouchercode.content.code', 'ANNUALPASSHOLDER'),

  visibleBasketItems: filter(
    "basketItems",
    function(basketItem) {
      const isHidden = get(basketItem, "metadata.isHidden");
      return (isHidden === false || isEmpty(isHidden));
    }
  ),

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
