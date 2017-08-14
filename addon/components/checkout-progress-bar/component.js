import Ember from 'ember';
import layout from './template';
const { Component, computed } = Ember;
const { alias, equal, or } = computed;

export default Component.extend({
  layout,

  isDeliveryActive: equal('step', 'delivery'),
  isExtrasActive: equal('step', 'extras'),
  isDetailsActive: equal('step', 'details'),
  isPaymentActive: equal('step', 'payment'),
  isFinishActive: equal('step', 'finish'),
  isFinishDone: alias('isFinishActive'),
  
  isDeliveryDone: or('isDeliveryActive', 'isExtrasDone'),
  isExtrasDone: or('isDetailsActive', 'isDetailsDone'),
  isDetailsDone: or('isPaymentActive', 'isPaymentDone'),
  isPaymentDone: or('isFinishActive', 'isFinishDone'),

});
