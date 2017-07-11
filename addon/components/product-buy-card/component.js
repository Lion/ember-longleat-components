import Ember from 'ember';
import layout from './template';

const { Component, get, inject: { service } } = Ember;

export default Component.extend({
  layout,
  classNames: ['product-buy-card'],

  basketService: service('basket'),
  basketItems: [],
  isLoading: false,
  isAddingToBasket: true, 

  init() {
    this._super(...arguments);
    this.set('basketItems', []);
  },

  didReceiveAttrs() {
    this._super(...arguments);
  },

  willDestroyElement() {
    this._super(...arguments);
    this.get('basketItems')
    .filterBy('isNew')
    .invoke('destroyRecord');
  },

  actions: {
    createBasketItem(basketItems, sku, quantity) {
      const basketService = get(this, 'basketService');
      return basketService.createBasketItem(basketItems, sku, quantity);
    },

    destroyBasketItem(basketItems, basketItem) {
      const basketService = get(this, 'basketService');
      return basketService.destroyBasketItem(basketItems, basketItem);
    }
}
});