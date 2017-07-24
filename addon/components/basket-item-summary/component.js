import Ember from 'ember';
import layout from './template';
const { Component, computed, get, inject, set } = Ember;
const { service } = inject;
const { alias, equal, filter, filterBy, gt, mapBy, notEmpty, sum } = computed;

export default Component.extend({

  productService: service('product'),
  skuService: service('sku'),
  layout,

  classNameBindings: [
    ':basket-item-summary',
    'isEditing',
    'hasZeroQuantity'
  ],

  defaultMaxQuantity: 100,

  isEditing: false,

  productFields: alias('basketItem.sku.product.productFields'),
  skuFields: alias('basketItem.sku.skuFields'),
  skuMaxQuantity: alias('basketItem.sku.maxQuantity'),
  hasSkuMaxQuantity: gt('skuMaxQuantity', 0),
  hasZeroQuantity: equal('basketItem.quantity', 0),
  dateFields: filterBy('skuFields', 'slug', 'bookable-date'),
  date: alias('dateFields.firstObject.values.firstObject'),
  hasDate: notEmpty('date'),
  bundleUUID: alias("basketItem.metadata.bundleUUID"),
  hasBundleUUID: notEmpty("bundleUUID"),
  productQuantities: mapBy("productBasketItems", "quantity"),
  productQuantity: sum("productQuantities"),

  productBasketItems: filter(
    'basketItems',
    function(basketItem) {
      return get(basketItem, "sku.product.id") === get(this, "basketItem.sku.product.id");
    }
  ),

  bundledBasketItems: computed(
    "basketItems.@each.metadata",
    "hasBundleUUID",
    "bundleUUID",
    "basketItem.id",
    function() {
      const hasBundleUUID = get(this, "hasBundleUUID");
      const bundleUUID = get(this, "bundleUUID");
      const targetBasketItem = get(this, "targetBasketItem");
      return get(this, "basketItems").filter(basketItem => {
        if (basketItem == targetBasketItem) {
          return false;
        }
        if (hasBundleUUID) {
          return bundleUUID === get(basketItem, "metadata.bundleUUID");
        }
      });
    }
  ),

  isHidden: computed(    
    'productFieldsHash.[]',
    function() {
      const productFieldsHash = get(this, "productFieldsHash");

      if (productFieldsHash['is-hidden']) {
        return true;
      } else {
        return false;
      }

    }
  ),

  canEdit: computed(
    'productFieldsHash.[]',
    function() {
      const productFieldsHash = get(this, "productFieldsHash");

      if (productFieldsHash['is-not-editable']) {
        return false;
      } else {
        return true;
      }

    }
  ),

  productFieldsHash: computed(
    'productFields.[]',
    function() {
      const productService = get(this, 'productService');
      const productFields = get(this, 'productFields');
      return productService.fieldsToHash(productFields);
    }
  ),

  skuFieldsHash: computed(
    'skuFields.[]',
    function() {
      const skuService = get(this, 'skuService');
      const skuFields = get(this, 'skuFields');
      return skuService.fieldsToHash(skuFields);
    }
  ),

  productMaxQuantity: computed(
    'productFieldsHash',
    'defaultMaxQuantity',
    function() {
      let productFields = get(this, 'productFieldsHash');

      if (productFields['max-quantity']) {
        return productFields['max-quantity']
      } else {
        return get(this, 'defaultMaxQuantity');
      }
    }
  ),

  maxQuantity: computed(
    'hasSkuMaxQuantity',
    'skuMaxQuantity',
    'defaultMaxQuantity',
    "productQuantity",
    "productMaxQuantity",
    "basketItem.quantity",
    function() {
      if (get(this, 'hasSkuMaxQuantity')) {
        return get(this, 'skuMaxQuantity');
      }
      return (get(this, 'productMaxQuantity') - get(this, "productQuantity")) + get(this, "basketItem.quantity");
    }
  ),

  linePrice: computed(
    'basketItem.{price,quantity}',
    function() {
      return get(this, 'basketItem.price') * get(this, 'basketItem.quantity');
    }
  ),

  editSubmitLabel: computed(
    'basketItem.quantity',
    function() {
      if (get(this, 'basketItem.quantity') === 0) {
        return 'Remove';
      }
      return 'OK';
    }
  ),

  actions: {
    toggleEditing() {
      this.toggleProperty('isEditing');
    },

    saveBasketItem(basketItem) {
      this.saveBasketItem(basketItem)
      .then(() => set(this, 'isEditing', false));
    },

    cancel(basketItem) {
      if (get(basketItem, 'hasDirtyAttributes')) {
        basketItem.rollbackAttributes();
        get(this, "bundledBasketItems").invoke("rollbackAttributes");
      }
      set(this, 'isEditing', false);
    },

    setQuantity(quantity) {
      set(this, 'basketItem.quantity', quantity);
      get(this, "bundledBasketItems").invoke("set", "quantity", quantity);
    }
  }
});
