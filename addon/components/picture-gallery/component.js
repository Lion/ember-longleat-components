import Ember from 'ember';
import layout from './template';

const { Component, computed, get, isEmpty, set } = Ember;

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
      return get(this, 'images').map(function(image) {
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
      if (isEmpty(get(this, 'activeItem.previous'))) {
        return this.setActiveItem(get(this, 'lastItem'));
      }
      this.setActiveItem(get(this, 'activeItem.previous'));
    },

    next() {
      if (isEmpty(get(this, 'activeItem.next'))) {
        return this.setActiveItem(get(this, 'firstItem'));
      }
      this.setActiveItem(get(this, 'activeItem.next'));
    }
  },

  setActiveItem(item) {
    if (isEmpty(item)) {
      return false;
    }
    if (!isEmpty(get(this, 'activeItem'))) {
      set(this, 'activeItem.isActive', false);
    }
    set(this, 'activeItem', item);
    set(this, 'activeItem.isActive', true);
  }
});
