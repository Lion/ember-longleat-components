import Ember from 'ember';
import layout from './template';
const { Component, computed } = Ember;
const { alias, and, empty, filterBy, gt, not, notEmpty } = computed;

export default Component.extend({
  layout,

  showPromotionalSaving: alias('hasPromotionalSaving'),
  hasPromotionalSaving: not('hasNoPromotionalSaving'),
  hasNoPromotionalSaving: empty('totalDiscount'),

  showAdvanceSaving: and('hasAdvanceSavingAmount', 'hasNoPromotionalSaving'),

  hasAdvanceSavingAmount: gt('advanceSavingAmount', 0),

  payments: filterBy('order.payments', 'isNew', false),

  hasPayments: notEmpty('payments'),
  hasOrder: notEmpty('order')
});
