import Ember from 'ember';
import layout from './template';
const { Component, computed, get } = Ember;
const { gt, not } = computed;

export default Component.extend({
  layout,

  maxQuantity: 32,
  minQuantity: 0,

  hasQuantity: gt('quantity', 0),
  cannotIncrement: not('canIncrement'),
  cannotDecrement: not('canDecrement'),

  canIncrement: computed(
    'quantity',
    'maxQuantity',
    function() {
      return (get(this, 'quantity') < get(this, 'maxQuantity'));
    }
  ),

  canDecrement: computed(
    'quantity',
    'minQuantity',
    function() {
      return (get(this, 'quantity') > get(this, 'minQuantity'));
    }
  ),


  actions: {

    increment() {
      if (get(this, 'cannotIncrement')) {
        return;
      }
      this.setQuantity(parseInt(get(this, 'quantity'), 10) + 1);
    },

    decrement() {
      if (get(this, 'cannotDecrement')) {
        return;
      }

      this.setQuantity(parseInt(get(this, 'quantity'), 10) - 1);
    },

    setQuantity() {
      let quantity = get(this, 'quantity');

      if (quantity < get(this, 'minQuantity')) {
        quantity = get(this, 'minQuantity');
      }

      if (quantity > get(this, 'maxQuantity')) {
        quantity = get(this, 'maxQuantity');
      }

      this.setQuantity(parseInt(quantity, 10));
    }
  }
});
