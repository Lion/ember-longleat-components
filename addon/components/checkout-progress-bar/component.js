import Ember from 'ember';
import layout from './template';
const { Component, computed } = Ember;
const { alias, equal, or } = computed;

export default Component.extend({
  layout,

  isExtrasActive: equal('step', 'extras'),
  isDetailsActive: equal('step', 'details'),
  isPaymentActive: equal('step', 'payment'),
  isFinishActive: equal('step', 'finish'),
  isFinishDone: alias('isFinishActive'),

  isExtrasDone: or('isDetailsActive', 'isDetailsDone'),
  isDetailsDone: or('isPaymentActive', 'isPaymentDone'),
  isPaymentDone: or('isFinishActive', 'isFinishDone'),

});
