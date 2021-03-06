import Ember from 'ember';
import moment from 'moment';
import layout from './template';
const { Component, computed, get, getWithDefault, inject, isEmpty, isPresent, set, setProperties } = Ember;
const { service } = inject;
const { alias, and, empty, equal, filter, filterBy, gt, mapBy, not, or, sum, uniq } = computed;

export default Component.extend({

  productService: service('product'),

  layout,

  classNames: ['select-tickets-form'],

  hasCondition: false,
  hasAcceptedCondition: false,
  conditionMessage: 'I accept',
  emptySelectVisitorsLabel: 'Number of visitors',
  ticketHolderLabel: 'Visitor',
  whosVisitingLabel: 'Who\'s visiting...',
  
  defaultProductMaxQuantity: 32,
  isSubmitting: false,

  productFields: alias('product.productFields'),
  quantities: mapBy('visibleBasketItems', 'quantity'),
  persistedProductQuantities: mapBy("persistedProductBasketItems", "quantity"),
  persistedProductQuantity: sum("persistedProductQuantities"),
  firstSku: alias('product.skus.firstObject'),
  productHasBookableDateField: filterBy('productFields', 'slug', 'has-bookable-date'),
  requiresDate: equal('productHasBookableDateField.value', true),
  isHidingForm: and("hasNoProductQuantityAvailable", "isNotSubmitting"),
  isShowingForm: not('isHidingForm'),
  chooseSessions: and('product.hasSessions', 'isNotGift'),
  isBasketItemsEmpty: empty('basketItems'),
  totalVisitors: sum('quantities'),
  hasBasketItems: gt('totalVisitors', 0),
  pricedQuantities: mapBy('pricedBasketItems', 'quantity'),
  totalPricedQuantity: sum('pricedQuantities'),
  quantityIsValid: and('minQuantityIsValid', 'maxQuantityIsValid'),
  canSubmit: and('hasBasketItems', 'quantityIsValid', 'conditionIsPassed'),
  cannotSubmit: not('canSubmit'),
  hasProductQuantityAvailable: gt("availableProductQuantity", 0),
  hasNoProductQuantityAvailable: not("hasProductQuantityAvailable", 0),
  isNotSubmitting: not("isSubmitting"),

  hasMinQuantity: gt('product.minQuantity', 0),
  hasMaxQuantity: gt('productMaxQuantity', 0),
  hasSmallPrint: or('hasMinQuantity', 'hasMaxQuantity'),
  skuFieldArrays: mapBy('skusWithStock', 'skuFields'),
  skuDateFields: filterBy('skuFields', 'slug', 'bookable-date'),
  skuDateValueArrays: mapBy('skuDateFields', 'values'),
  dates: uniq('skuValueDates'),
  visibleBasketItems: filterBy("basketItems", "isHidden", false),
  skusWithStock: filter('skus', function(sku) {
    if (get(sku, 'stockQuantity') > 0) {
      return sku;
    } 
  }),

  persistedProductBasketItems: filter(
    'persistedBasketItems',
    function(persistedBasketItem) {
      return get(persistedBasketItem, "sku.product.id") === get(this, "product.id");
    }
  ),

  productMaxQuantity: computed(
    'productFieldsHash',
    'defaultProductMaxQuantity',
    function() {
      let productFields = get(this, 'productFieldsHash');

      if (productFields['max-quantity']) {
        return productFields['max-quantity']
      } else {
        return get(this, 'defaultProductMaxQuantity');
      }
    }
  ),

  conditionIsPassed: computed(
    'hasCondition',
    'hasAcceptedCondition',
    function() {
      const hasCondition = get(this,'hasCondition');
      const hasAcceptedCondition = get(this,'hasAcceptedCondition');
      if (hasCondition) {
        return hasAcceptedCondition;
      }
      return true;
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

  pricedBasketItems: filter(
    'basketItems',
    function(basketItem) {
      return get(basketItem, 'price') > 0;
    }
  ),

  minQuantityIsValid: computed(
    'totalPricedQuantity',
    'product.minQuantity',
    function() {
      return get(this, 'totalPricedQuantity') >= getWithDefault(this, 'product.minQuantity', 0);
    }
  ),

  maxQuantityIsValid: computed(
    'totalPricedQuantity',
    'productMaxQuantity',
    function() {
      const maxQuantity = getWithDefault(this, 'productMaxQuantity', 0);
      const totalPricedQuantity = get(this, 'totalPricedQuantity');
      if (maxQuantity === 0) {
        return true;
      }
      return totalPricedQuantity <= maxQuantity;
    }
  ),

  availableProductQuantity: computed(
    "productMaxQuantity",
    "persistedProductQuantity",
    function() {
      return get(this, 'productMaxQuantity') - get(this, "persistedProductQuantity")
    }
  ),

  canIncrementForProduct: computed(
    'productMaxQuantity',
    'totalPricedQuantity',
    'availableProductQuantity',
    function() {
      const availableProductQuantity = get(this, "availableProductQuantity");
      const maxQuantity = get(this, 'productMaxQuantity');
      const totalPricedQuantity = get(this, 'totalPricedQuantity')
      if (isEmpty(maxQuantity) || maxQuantity === 0) {
        return true;
      }
      return totalPricedQuantity < availableProductQuantity;
    }
  ),

  totalPrice: computed(
    'basketItems.@each.{price,quantity}',
    function() {
      const basketItems = get(this, 'basketItems');
      return basketItems.reduce((total, basketItem) => 
        total + (get(basketItem, 'price') * get(basketItem, 'quantity'))
      , 0)
      .toFixed(2);
    }
  ),

  dateLabel: computed(
    'date',
    function() {
      const date = get(this, 'date');
      if (isEmpty(date)) {
        return "Choose date";
      }
      return moment.utc(date).format('DD/MM/YYYY');
    }
  ),

  selectVisitorsLabel: computed(
    'isBasketItemsEmpty',
    'totalVisitors',
    'basketItems.[]',
    'emptySelectVisitorsLabel',
    'ticketHolderLabel',
    function() {
      const totalVisitors = get(this, 'totalVisitors');
      const isBasketItemsEmpty = get(this, 'isBasketItemsEmpty');
      const emptyLabel = get(this, 'emptySelectVisitorsLabel');
      const ticketHolderLabel = get(this, 'ticketHolderLabel');
      if (isBasketItemsEmpty) {
        return emptyLabel;
      }
      if (totalVisitors === 1) {
        return totalVisitors + ' ' + ticketHolderLabel;
      }
      return totalVisitors + ' ' + ticketHolderLabel +'s';
    }
  ),

  isSelectVisitorsDisabled: computed(
    'requiresDate',
    'date',
    function() {
      const requiresDate = get(this, 'requiresDate');
      const date = get(this, 'date');
      if (requiresDate) {
        return isEmpty(date);
      }
      return false;
    }
  ),

  skuFields: computed(
    'skuFieldArrays.[]',
    function() {
      let skuFieldArrays = get(this, 'skuFieldArrays')
      return skuFieldArrays.reduce((skuFields, skuFieldArray) =>  skuFields.pushObjects(skuFieldArray.toArray()), []);
    }
  ),

  skuValueDates: computed(
    'skuDateValueArrays.[]',
    function() {
      let skuDateValueArrays = get(this, 'skuDateValueArrays');
      return skuDateValueArrays.reduce((dates, skuDateValueArray) => dates.pushObjects(skuDateValueArray), []);
    }
  ),
  
  days: computed(
    'displayDate',
    'dates.[]',
    function() {
      let dates = get(this, 'dates');
      let startDay = get(this, 'displayDate').clone().startOf('month').weekday(0);
      let finishDay = get(this, 'displayDate').clone().endOf('month').weekday(6);
      let days = [];
      while (startDay.isBefore(finishDay)) {
        let key = "";
        let isSelectable = false;
        
        if (dates.includes(startDay.format())) {
          isSelectable = true;
        }

        days.pushObject({
          day: startDay.clone(),
          name: startDay.format('YYYY-MM-DD'),
          isSelectable: isSelectable,
          isDisabled: !isSelectable,
          key: key
        });
        startDay.add(1, 'day');
      }
      return days;
    }
  ),

  filteredSkus: computed(
    'skus.[]',
    'date',
    function() {
      const skus = get(this, 'skus');
      const date = get(this, 'date').format();

      return skus.filter(sku => 
        get(sku, 'skuFields')
        .filterBy('slug', 'bookable-date')
        .findBy('values.firstObject', date)
      );
    }
  )

});

