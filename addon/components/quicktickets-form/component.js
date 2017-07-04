import Ember from 'ember';
import layout from './template';
import moment from 'moment';

const { Component, get, inject, set } = Ember;

export default Ember.Component.extend({
  layout, 
  
  classNameBindings: [
    'isOpen'
  ],

  basketService: inject.service('basket'),
  store: inject.service(),
  //openingTimes: inject.service('openingTimes'),

  basketItems: [],
  isLoading: false,
  isAddingToBasket: true, 

  minDate: moment.utc('2017-02-01').startOf('month'),
  maxDate: moment.utc('2018-01-07'),

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
    
    didChangeDate() {

    },

    createBasketItem(basketItems, sku, quantity) {
      const basketService = get(this, 'basketService');
      return basketService.createBasketItem(basketItems, sku, quantity);
    },

    destroyBasketItem(basketItems, basketItem) {
      const basketService = get(this, 'basketService');
      return basketService.destroyBasketItem(basketItems, basketItem);
    }
  },
});
