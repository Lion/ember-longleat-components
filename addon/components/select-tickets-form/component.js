import Ember from 'ember';
// import moment from 'moment';
const { Component, computed, get, inject, isEmpty } = Ember;
const { service } = inject;
const { alias, mapBy } = computed;
import layout from './template';

export default Component.extend({

  productService: service('product'),

  layout,

  productFields: alias('product.productFields'),
  quantities: mapBy('basketItems', 'quantity'),

  productFieldsHash: computed(
    'productFields.[]',
    function() {
      const productService = get(this, 'productService');
      const productFields = get(this, 'productFields');
      return productService.fieldsToHash(productFields);
    }
  ),



  // date: moment.utc().startOf('day').add(1, 'day'),
  // minDate: moment.utc().startOf('month'),
  // maxDate: moment.utc("2018-01-07"),
  // requiresDate: Ember.computed.and('product.requiresDate', 'isNotGift'),
  // displayDate: moment.utc().startOf('month'),

  isShowingCalendar: false,
  isShowingVisitors: false,
  isHidingForm: false,
  isShowingForm: Ember.computed.not('isHidingForm'),

  isGift: false,
  isNotGift: Ember.computed.not('isGift'),
  giftMessage: '',

  chooseSessions: Ember.computed.and('product.hasSessions', 'isNotGift'),

  hasCondition: false,
  hasAcceptedCondition: false,
  conditionMessage: 'I accept',
  conditionIsPassed: Ember.computed(
    'hasCondition',
    'hasAcceptedCondition',
    function() {
      if (this.get('hasCondition')) {
        return this.get('hasAcceptedCondition');
      }
      return true;
    }
  ),

  isBasketItemsEmpty: Ember.computed.empty('basketItems'),

  


  totalVisitors: Ember.computed.sum('quantities'),

  hasBasketItems: Ember.computed.gt('totalVisitors', 0),

  pricedBasketItems: Ember.computed.filter(
    'basketItems',
    function(basketItem) {
      return basketItem.get('price') > 0;
    }
  ),
  pricedQuantities: Ember.computed.mapBy('pricedBasketItems', 'quantity'),
  totalPricedQuantity: Ember.computed.sum('pricedQuantities'),

  minQuantityIsValid: Ember.computed(
    'totalPricedQuantity',
    'product.minQuantity',
    function() {
      return this.get('totalPricedQuantity') >= this.get('product.minQuantity');
    }
  ),

  maxQuantityIsValid: Ember.computed(
    'totalPricedQuantity',
    'product.maxQuantity',
    function() {
      if (this.get('product.maxQuantity') === 0) {
        return true;
      }
      return this.get('totalPricedQuantity') <= this.get('product.maxQuantity');
    }
  ),

  quantityIsValid: Ember.computed.and('minQuantityIsValid', 'maxQuantityIsValid'),

  canIncrementForProduct: Ember.computed(
    'product.maxQuantity',
    'totalPricedQuantity',
    function() {
      const maxQuantity = get(this, 'product.maxQuantity');
      if (isEmpty(maxQuantity) || maxQuantity === 0) {
        return true;
      }
      return get(this, 'totalPricedQuantity') < get(this, 'product.maxQuantity');
    }
  ),

  canSubmit: Ember.computed.and('hasBasketItems', 'quantityIsValid', 'conditionIsPassed'),
  cannotSubmit: Ember.computed.not('canSubmit'),

  totalPrice: Ember.computed(
    'basketItems.@each.price',
    'basketItems.@each.quantity',
    function() {
      return this.get('basketItems').reduce((total, basketItem) => {
        return total + (basketItem.get('price') * basketItem.get('quantity'));
      }, 0)
      .toFixed(2);
    }
  ),

  hasMinQuantity: Ember.computed.gt('product.minQuantity', 0),
  hasMaxQuantity: Ember.computed.gt('product.maxQuantity', 0),
  hasSmallPrint: Ember.computed.or('hasMinQuantity', 'hasMaxQuantity', 'isGift'),

  // dateLabel: Ember.computed(
  //   'date',
  //   function() {
  //     if (Ember.isEmpty(this.get('date'))) {
  //       return "Choose date";
  //     }
  //     return moment.utc(this.get('date')).format('DD/MM/YYYY');
  //   }
  // ),

  emptySelectVisitorsLabel: 'Number of visitors',
  ticketHolderLabel: 'Visitor',
  whosVisitingLabel: 'Who\'s visiting...',
  selectVisitorsLabel: Ember.computed(
    'isBasketItemsEmpty',
    'totalVisitors',
    'basketItems.[]',
    'emptySelectVisitorsLabel',
    'ticketHolderLabel',
    function() {
      if (this.get('isBasketItemsEmpty')) {
        return this.get('emptySelectVisitorsLabel');
      }
      if (this.get('totalVisitors') === 1) {
        return this.get('totalVisitors') + ' ' + this.get('ticketHolderLabel');
      }
      return this.get('totalVisitors') + ' ' + this.get('ticketHolderLabel') +'s';
    }
  ),

  isSelectVisitorsDisabled: Ember.computed(
    'requiresDate',
    'date',
    function() {
      if (this.get('requiresDate')) {
        return Ember.isEmpty(this.get('date'));
      }
      return false;
    }
  ),

  customDateKey: null,
  hasCustomDateKey: Ember.computed.notEmpty('customDateKey'),

  days: Ember.computed(
    'displayDate',
    'bookableDates',
    'requiresDate',
    function() {

      if (this.get('requiresDate') === false) {
        return [];
      }

      let startDay = this.get('displayDate').clone().startOf('month').weekday(0);
      let finishDay = this.get('displayDate').clone().endOf('month').weekday(6);
      let days = [];
      while (startDay.isBefore(finishDay)) {
        let bookableDate = this.get('bookableDates').findBy('date', startDay.format('YYYY-MM-DD'));
        let key = "";
        let isSelectable = false;

        if (this.get('hasCustomDateKey')) {
          let customDateKey = this.get('customDateKey.dates').findBy('date', startDay.format('YYYY-MM-DD'));
          if (Ember.isPresent(customDateKey)) {
            key += customDateKey['key'];
          }
        }

        if (Ember.isPresent(bookableDate) &&
            Ember.isPresent(bookableDate.get('skus'))
        ) {
          isSelectable = true;
          if (this.get('hasCustomDateKey') === false) {
            key += bookableDate.get('skus').mapBy('type').uniq().join(' ');
          }
        }

        days.pushObject({
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

  bookableDate: Ember.computed(
    'bookableDates.@each.date',
    'date',
    function() {
      return [];
      // return this.get('bookableDates')
      // .findBy('date', this.get('date').format('YYYY-MM-DD'));
    }
  ),

  // skus: Ember.computed(
  //   'bookableDate.skus.[]',
  //   'bookableDate.skus.@each.type',
  //   'skuTypes',
  //   function() {

  //     if (this.get('requiresDate') === false) {
  //       return this.get('allSkus');
  //     }

  //     let skus = this.get('bookableDate.skus');
  //     if (Ember.isEmpty(this.get('skuTypes'))) {
  //       return skus;
  //     }
  //     let skuType = this.get('skuTypes').find(skuType => {
  //       if (skus.any(sku =>  (sku.get('type') === skuType))) {
  //         return skuType;
  //       }
  //     });
  //     return skus.filterBy('type', skuType);
  //   }
  // ),

  actions: {
    changeDisplayDate(displayDate) {
      this.set('displayDate', displayDate);
    },

    selectDate(date) {

      if (!date.isSame(this.get('date'))) {
        this.get('basketItems').invoke('destroyRecord');
        this.get('basketItems').clear();
      }

      this.setProperties({
        date: date,
        isShowingCalendar: false
      });

      if (Ember.isPresent(this.attrs.didChangeDate)) {
        this.attrs.didChangeDate(date);
      }
    },

    selectVisitors() {
      this.set('isShowingVisitors', false);
    }
  },

});
