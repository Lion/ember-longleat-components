import Ember from 'ember';
import layout from './template';

const { Component, computed, isEmpty } = Ember;

export default Component.extend({
  layout,

  init() {
    this._super(...arguments);
    this.setActiveItem(this.get('items.firstObject'));
  },

  classNames: ['component-picture-gallery'],
  
  items: computed(
    'images.[]',
    function() {
      let previous = null, item = null;
      return this.get('images').map(function(image) {
        item = {
          image: image,
          isActive: false,
          previous: previous,
          next: null
        };

        if (previous !== null) {
          previous.next = item;
        }
        previous = item;
        return item;
      });
    }
  ),

  firstItem: computed.alias('items.firstObject'),
  lastItem: computed.alias('items.lastObject'),

  actions: {
    setActive(item) {
      this.setActiveItem(item);
    },

    previous() {
      if (isEmpty(this.get('activeItem.previous'))) {
        return this.setActiveItem(this.get('lastItem'));
      }
      this.setActiveItem(this.get('activeItem.previous'));
    },

    next() {
      if (isEmpty(this.get('activeItem.next'))) {
        return this.setActiveItem(this.get('firstItem'));
      }
      this.setActiveItem(this.get('activeItem.next'));
    }
  },

  setActiveItem(item) {
    if (isEmpty(item)) {
      return false;
    }
    if (!isEmpty(this.get('activeItem'))) {
      this.set('activeItem.isActive', false);
    }
    this.set('activeItem', item);
    this.set('activeItem.isActive', true);
  }
});
