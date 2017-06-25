import Ember from 'ember';
import layout from './template';
const { Component, computed } = Ember;
const { alias, and, empty, gt, not } = computed;

export default Component.extend({
  layout,

  showPromotionalSaving: alias('hasPromotionalSaving'),
  hasPromotionalSaving: not('hasNoPromotionalSaving'),
  hasNoPromotionalSaving: empty('totalDiscount'),

  showAdvanceSaving: and('hasAdvanceSavingAmount', 'hasNoPromotionalSaving'),

  hasAdvanceSavingAmount: gt('advanceSavingAmount', 0),
});
