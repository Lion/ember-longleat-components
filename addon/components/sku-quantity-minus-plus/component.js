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

  hasAge: notEmpty('fieldsHash.age'),
  hasQuantity: gt('quantity', 0),
  fields: alias('sku.skuFields'),
  isNotFree: gt('sku.price', 0),
  isFree: not('isNotFree'),
  firstSkuBasketItem: alias("skuBasketItems.firstObject"),
  skuBasketItemQuantities: mapBy('skuBasketItems', 'quantity'),
  skuBasketItemQuantity: sum('skuBasketItemQuantities'),
  cannotIncrement: not('canIncrement'),
  canDecrement: gt('skuBasketItemQuantity', 0),
  cannotDecrement: not('canDecrement'),
  hasProductMaxQuantity: gt('sku.product.maxQuantity', 0),
  bundleUUID: alias("firstSkuBasketItem.metadata.bundleUUID"),
  hasBundleUUID: notEmpty("bundleUUID"),
  
  skuBasketItems: filter('basketItems', function(basketItem) {
    return get(basketItem, 'sku.id') === get(this, 'sku.id');
  }),

  productMaxQuantity: computed(
    'hasProductMaxQuantity',
    'sku.product.maxQuantity',
    'defaultMax',
    function() {
      if (get(this, 'hasProductMaxQuantity')) {
        return  get(this, 'sku.product.maxQuantity');
      }
      return get(this, 'defaultMax');
    }
  ),
  
  fieldsHash: computed(
    'fields.[]',
    function() {
      const skuService = get(this, 'skuService');
      const fields = get(this, 'fields');
      return skuService.fieldsToHash(fields);
    }
  ),

  lineTotal: computed(
    'skuBasketItemQuantity',
    'sku.price',
    "bundledBasketItems.@each.price",
    function() {
      let totalPrice = get(this, "bundledBasketItems").reduce((totalPrice, basketItem) => totalPrice + get(basketItem, "sku.price"), 0) + get(this, "sku.price");
      return (get(this, 'skuBasketItemQuantity') * totalPrice);
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

  available: computed(
    'maxQuantity',
    'skuBasketItemQuantity',
    function() {
      return get(this, 'maxQuantity') - get(this, 'skuBasketItemQuantity');
    }
  ),

  maxQuantity: computed(
    'defaultMax',
    'hasProductMaxQuantity',
    'productMaxQuantity',
    'sku.stockQuantity',
    function() {
      let fieldsHash = get(this, 'fieldsHash');
      let skuMaxQuantity = get(fieldsHash, 'max-quantity');

      if (skuMaxQuantity > 0) {
        return Math.min(get(this, 'productMaxQuantity'), get(this, 'sku.stockQuantity'), skuMaxQuantity);
      } else {
        return Math.min(get(this, 'productMaxQuantity'), get(this, 'sku.stockQuantity'));
      }
    }
  ),

  bundledBasketItems: computed(
    "basketItems.@each.metadata",
    "hasBundleUUID",
    "bundleUUID",
    "firstSkuBasketItem.id",
    function() {
      const hasBundleUUID = get(this, "hasBundleUUID");
      const bundleUUID = get(this, "bundleUUID");
      const firstSkuBasketItem = get(this, "firstSkuBasketItem");
      return get(this, "basketItems").filter(basketItem => {
        if (basketItem == firstSkuBasketItem) {
          return false;
        }
        if (hasBundleUUID) {
          return bundleUUID === get(basketItem, "metadata.bundleUUID");
        }
      });
    }
  ),

  actions: {

    increment() {
      const basketItems = get(this, 'basketItems');
      let basketItem = get(this, 'firstSkuBasketItem');
      let sku = get(this, 'sku');
      
      if (!get(this, 'canIncrement')) {
          return;
      }

      if (isEmpty(basketItem)) {
        return this.createBasketItem(basketItems, sku, 1);
      }
      
      basketItem.incrementProperty('quantity');
      get(this, "bundledBasketItems").invoke("incrementProperty", "quantity");
    },

    decrement() {
      var basketItem = get(this, 'firstSkuBasketItem');

      if (isEmpty(basketItem)) {
        return;
      }

      basketItem.decrementProperty('quantity');
      get(this, "bundledBasketItems").invoke("decrementProperty", "quantity");

      if (get(basketItem, 'quantity') === 0) {
        return this.deleteBasketItem(get(this, 'basketItems'), basketItem);
      }
    }
  }
});
