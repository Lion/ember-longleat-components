import Ember from 'ember';
import layout from './template';

const { Component, computed, get } = Ember;
const { alias, sort } = computed;

export default Component.extend({
  layout,
  classNames: ['product-card'],
  productImageSorting: ['id:asc'],

  productImages: alias("product.productImages"),
  sortedProductImages: sort('productImages', 'productImageSorting'),

  cardImage: computed(
    "sortedProductImages.firstObject.originalUrl",
    function() {
      return get(this, "sortedProductImages.firstObject.originalUrl");
    }
  )
});
