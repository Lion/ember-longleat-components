import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout,
  
  classNames: ['component-sku-quantity-minus-plus'],

  defaultMax: 32,

  // titleMeta: Ember.computed.filterBy('sku.metadata', 'metum.name', 'Title'),
  // title: Ember.computed.alias('titleMeta.firstObject.value'),

  // hasAge: Ember.computed.notEmpty('ageMeta'),
  // ageMeta: Ember.computed.filterBy('sku.metadata', 'metum.name', 'Age'),
  // age: Ember.computed.alias('ageMeta.firstObject.value'),

  // hasTitleTemplate: Ember.computed.notEmpty('titleTemplate'),
  // renderedTitle: Ember.computed(
  //   'titleTemplate',
  //   'metaMap.[].name',
  //   'metaMap.[].value',
  //   function() {
  //     return this.get('metaMap').reduce((title, field) => title.replace('{{' + field.name + '}}', field.value), this.get('titleTemplate'));
  //   }
  // ),

  // metaMap: Ember.computed(
  //   'sku.metadata.@each.metum',
  //   'sku.metadata.@each.value',
  //   function() {
  //     return this.get('sku.metadata').reduce((metaMap, metadatum) => {
  //       metaMap.push({
  //         name: metadatum.get('metum.name'), 
  //         value: metadatum.get('value')
  //       });
  //       return metaMap;
  //     }, []);
  //   }
  // ),


  // lineTotal: Ember.computed(
  //   'skuBasketItemQuantity',
  //   'sku.price',
  //   function() {
  //     return (this.get('skuBasketItemQuantity') * this.get('sku.price')).toFixed(2);
  //   }
  // ),

  // skuBasketItems: Ember.computed(
  //   'basketItems.[]',
  //   'basketItems.@each.session',
  //   'sku',
  //   'date',
  //   'session.id',
  //   function() {
  //     let sku = this.get('sku');
  //     let dateTimestamp = null;
  //     if (Ember.isPresent(this.get('date')) &&
  //       sku.get('product.requiresDate') === true
  //     ) {
  //       dateTimestamp = this.get('date').unix();
  //     }
  //     return this.get('basketItems').filter((basketItem) => {
  //       return (
  //         basketItem.get('sku.id') === sku.get('id') &&
  //         basketItem.get('dateTimestamp') === dateTimestamp &&
  //         basketItem.get('session.id') === this.get('session.id')
  //       );
  //     });
  //   }
  // ),
  // skuBasketItemQuantities: Ember.computed.mapBy('skuBasketItems', 'quantity'),
  // skuBasketItemQuantity: Ember.computed.sum('skuBasketItemQuantities'),

  // sessionBasketItems: Ember.computed(
  //   'basketItems.@each.session.id',
  //   'session.id',
  //   function() {
  //     return this.get('basketItems')
  //     .filter(basketItem => (basketItem.get('session.id') === this.get('session.id')));
  //   }
  // ),
  // sessionBasketQuantity: Ember.computed(
  //   'sessionBasketItems.@each.quantity',
  //   'sessionBasketItems.@each.sku',
  //   function() {
  //     return this.get('sessionBasketItems').reduce(
  //       (quantity, basketItem) => 
  //       quantity + basketItem.get('quantity') * (basketItem.get('sku.stockItems').reduce(
  //         (stockItemQuantity, stockItem) => 
  //         stockItemQuantity + stockItem.get('quantity'), 0)
  //       ), 0
  //     );
  //   }
  // ),

  // hasQuantity: Ember.computed.gt('quantity', 0),
  // isNotFree: Ember.computed.gt('sku.price', 0),
  // isFree: Ember.computed.not('isNotFree'),

  // available: Ember.computed(
  //   'sessionBasketQuantity',
  //   'stockItemQuantity',
  //   'maxQuantity',
  //   'skuBasketItemQuantity',
  //   'sku.minAvailableSessionSpaces',
  //   function() {
  //     if (this.get('session.available') < this.get('sku.minAvailableSessionSpaces')) {
  //       return 0;
  //     }
  //     if (Ember.isPresent(this.get('session'))) {
  //       return this.get('maxQuantity') - this.get('sessionBasketQuantity');
  //     } 
  //     return this.get('maxQuantity') - (this.get('skuBasketItemQuantity') * this.get('skuStockItemQuantity'));
  //   }
  // ),

  // canIncrementForProduct: true,
  // canIncrement: Ember.computed(
  //   'available',
  //   'inventoryIncrementAmount',
  //   'canIncrementForProduct',
  //   'isFree',
  //   function() {
  //     let {isNotFree, canIncrementForProduct, available, inventoryIncrementAmount} = this.getProperties('isNotFree', 'canIncrementForProduct', 'available', 'inventoryIncrementAmount');
  //     if (isNotFree) {
  //       return (canIncrementForProduct && (inventoryIncrementAmount <= available));
  //     }
  //     return (inventoryIncrementAmount <= available);
  //   }
  // ),
  // cannotIncrement: Ember.computed.not('canIncrement'),
  // canDecrement: Ember.computed.gt('skuBasketItemQuantity', 0),
  // cannotDecrement: Ember.computed.not('canDecrement'),

  // skuStockItemQuantities: Ember.computed.mapBy('sku.stockItems', 'quantity'),
  // skuStockItemQuantity: Ember.computed.sum('skuStockItemQuantities'),
  // inventoryIncrementAmount: Ember.computed.alias('skuStockItemQuantity'),

  // hasSkuMaxQuantity: Ember.computed.gt('sku.maxQuantity', 0),

  // maxQuantity: Ember.computed(
  //   'session.available',
  //   'defaultMax',
  //   'hasSkuMaxQuantity',
  //   'sku.maxQuantity',
  //   function() {
  //     if (!Ember.isEmpty(this.get('session'))) {
  //       return this.get('session.available');
  //     }
  //     if (this.get('hasSkuMaxQuantity')) {
  //       return this.get('sku.maxQuantity');
  //     }
  //     return this.get('defaultMax');
  //   }
  // ),

  // actions: {

  //   increment() {
  //     let basketItem = this.get('skuBasketItems.firstObject');
  //     let date = this.get('date');
  //     let session = this.get('session');
  //     let sku = this.get('sku');

  //     if (!this.get('canIncrement')) {
  //         return;
  //     }

  //     if (Ember.isEmpty(basketItem) || sku.get('useMetaFields') === 1) {
  //       return this.createBasketItem({
  //         basketItems: this.get('basketItems'),
  //         date: date,
  //         quantity: 1,
  //         session: session,
  //         sku: sku,
  //         price: sku.get('price'),
  //         isGift: this.get('isGift'),
  //         giftMessage: this.get('giftMessage'),
  //       });
  //     }

  //     basketItem.incrementProperty('quantity');
  //   },

  //   decrement() {
  //     var basketItem = this.get('skuBasketItems.firstObject');

  //     if (Ember.isEmpty(basketItem)) {
  //       return;
  //     }

  //     basketItem.decrementProperty('quantity');

  //     if (basketItem.get('quantity') === 0) {
  //       return this.deleteBasketItem(this.get('basketItems'), basketItem);
  //     }
  //   }
  // }
});
