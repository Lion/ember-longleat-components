import Ember from 'ember';
import layout from './template';
const { Component, computed, get, getProperties, inject, isEmpty } = Ember;
const { service } = inject;
const { alias, filter, gt, mapBy, not, notEmpty, sum } = computed;

export default Component.extend({
  skuService: service('sku'),
  
  layout,
  
  classNames: ['sku-quantity-minus-plus'],
  defaultMax: 32,
  incrementAmount: 1,
  canIncrementForProduct: true,

  hasTitleTemplate: notEmpty('skuTitleTemplate'),
  hasAge: notEmpty('fieldsHash.age'),
  hasQuantity: gt('quantity', 0),
  fields: alias('sku.skuFields'),
  isNotFree: gt('sku.price', 0),
  isFree: not('isNotFree'),
  skuBasketItemQuantities: mapBy('skuBasketItems', 'quantity'),
  skuBasketItemQuantity: sum('skuBasketItemQuantities'),
  cannotIncrement: not('canIncrement'),
  canDecrement: gt('skuBasketItemQuantity', 0),
  cannotDecrement: not('canDecrement'),
  hasSkuMaxQuantity: gt('sku.maxQuantity', 0),
  
  skuBasketItems: filter('basketItems', function(basketItem) {
    return get(basketItem, 'sku.id') === get(this, 'sku.id');
  }),

  fieldsHash: computed(
    'fields.[]',
    function() {
      const skuService = get(this, 'skuService');
      const fields = get(this, 'fields');
      return skuService.fieldsToHash(fields);
    }
  ),

  renderedTitle: computed(
    'skuTitleTemplate',
    'fieldsHash.[]',
    function() {
      let fieldsHash = get(this, 'fieldsHash');
      let skuTitleTemplate = get(this, 'skuTitleTemplate');
      return Object.keys(fieldsHash).reduce(
        (title, key) => {
          let regex = new RegExp(`{{${key}}}`, 'gi');
          return title.replace(regex, fieldsHash[key])
        }, 
        skuTitleTemplate
      );
    }
  ),

  lineTotal: computed(
    'skuBasketItemQuantity',
    'sku.price',
    function() {
      return (get(this, 'skuBasketItemQuantity') * (get(this, 'sku.price')));
    }
  ),
  
  available: computed(
    'maxQuantity',
    'skuBasketItemQuantity',
    function() {
      return get(this, 'maxQuantity') - get(this, 'skuBasketItemQuantity');
    }
  ),

  canIncrement: computed(
    'available',
    'incrementAmount',
    'canIncrementForProduct',
    'isFree',
    function() {
      let {isNotFree, canIncrementForProduct, available, incrementAmount} = getProperties(this, 'isNotFree', 'canIncrementForProduct', 'available', 'incrementAmount');
      if (isNotFree) {
        return (canIncrementForProduct && (incrementAmount <= available));
      }
      return (incrementAmount <= available);
    }
  ),

  maxQuantity: computed(
    'defaultMax',
    'hasSkuMaxQuantity',
    'sku.maxQuantity',
    function() {
      if (get(this, 'hasSkuMaxQuantity')) {
        return get(this, 'sku.maxQuantity');
      }
      return get(this, 'defaultMax');
    }
  ),

  actions: {

    increment() {
      const basketItems = get(this, 'basketItems');
      let basketItem = get(this, 'skuBasketItems.firstObject');
      let sku = get(this, 'sku');

      if (!get(this, 'canIncrement')) {
          return;
      }

      if (isEmpty(basketItem)) {
        return this.createBasketItem(basketItems, sku, 1);
      }

      basketItem.incrementProperty('quantity');
    },

    decrement() {
      var basketItem = get(this, 'skuBasketItems.firstObject');

      if (isEmpty(basketItem)) {
        return;
      }

      basketItem.decrementProperty('quantity');

      if (get(basketItem, 'quantity') === 0) {
        return this.deleteBasketItem(get(this, 'basketItems'), basketItem);
      }
    }
  }
});
