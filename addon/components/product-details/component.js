import Ember from 'ember';
import layout from './template';

const { Component, computed, get, isPresent } = Ember;

export default Component.extend({
  layout,

  classNames: ['component-product-details'],
  description: {isDescription: true},

  priceTableFields: computed(
    'fullPriceDisplay',
    function() {
      if (get(this, 'fullPriceDisplay')) {
        return [{
            heading: 'Visitor',
            path: 'title',
            isStrong: true
          }, {
            heading: 'Gate Price',
            path: 'fullPrice',
            hasStrikeThrough: true,
            isCentered: true,
            isStrong: true
          }, {
            heading: 'Online Price*',
            path: 'price',
            isCentered: true,
            isStrong: true
        }];
      } 
      return [{
          heading: 'Visitor',
          path: 'title',
          isStrong: true
        }, {
          heading: '',
        }, {
          heading: 'Price*',
          path: 'price',
          isStrong: true,
          isCentered: true,
      }];
    }
  ),

  hasProductTitleTemplate: computed.notEmpty('productTitleTemplate'),

  priceTableData: computed(
    'hasTitleTemplate',
    'productTitleTemplate',
    'fullPriceDisplay',
    'skus.[]',
    function() {
      let priceQualifier = '';
      if (get(this, 'fullPriceDisplay')) {
        priceQualifier = '*';
      }

      console.log(get(this, 'skus.firstObject.data'));

      let hasAge = isPresent(get(this, 'skus.firstObject.data').findBy('metum.name', 'Age'));

      return get(this, 'skus').map((sku) => {
        let title = "";
        if (get(this, 'hasProductTitleTemplate')) {
          title = sku.get('metadata').reduce(
            (title, metadatum) => title.replace('{{' + metadatum.get('metum.name') + '}}', metadatum.get('value')), get(this, 'productTitleTemplate')
          );
        } else {
          title = sku.get('metadata').findBy('metum.name', 'Title').get('value');
          if (hasAge) {
            let age = sku.get('metadata').findBy('metum.name', 'Age').get('value');
            title += ` (${age})`;
          }
        }

        return {
          title: title,
          fullPrice: '£' + sku.get('fullPrice'),
          price: '£' + sku.get('price') + priceQualifier,
        };
      });
    }
  )

});
