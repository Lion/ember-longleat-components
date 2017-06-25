import Ember from 'ember';
import layout from './template';
const { Component, computed, get, inject, set } = Ember;
const { service } = inject;
const { alias, equal, filterBy, gt, notEmpty } = computed;

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
  canEdit: true,
  isEditing: false,

  productFields: alias('basketItem.sku.product.productFields'),
  skuFields: alias('basketItem.sku.skuFields'),
  skuMaxQuantity: alias('basketItem.sku.maxQuantity'),
  hasSkuMaxQuantity: gt('skuMaxQuantity', 0),
  hasZeroQuantity: equal('basketItem.quantity', 0),
  dateFields: filterBy('skuFields', 'slug', 'bookable-date'),
  date: alias('dateFields.firstObject.values.firstObject'),
  hasDate: notEmpty('date'),

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

  maxQuantity: computed(
    'hasSkuMaxQuantity',
    'skuMaxQuantity',
    'defaultMaxQuantity',
    function() {
      if (get(this, 'hasSkuMaxQuantity')) {
        return get(this, 'skuMaxQuantity');
      }
      return get(this, 'defaultMaxQuantity')
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
      }
      set(this, 'isEditing', false);
    },

    setQuantity(quantity) {
      set(this, 'basketItem.quantity', quantity);
    }
  }
});
