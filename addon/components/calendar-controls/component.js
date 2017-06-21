import Ember from 'ember';
import layout from './template';

const { Component, computed, get, isEmpty } = Ember;

export default Component.extend({
  layout,

  classNames: ['calendar-controls'],
  
  canIncrementMonth: computed(
    'maxDate',
    'displayDate',
    function() {
      if (get(this, 'maxDate').isAfter(get(this, 'displayDate'))) {
        return null;
      }
      return true;
    }
  ),

  canDecrementMonth: computed(
    'minDate',
    'displayDate',
    function() {
      if (get(this, 'minDate').isBefore(get(this, 'displayDate'))) {
        return null;
      }
      return true;
    }
  ),

  actions: {
    previousMonth() {
      if (isEmpty(get(this, 'canDecrementMonth'))) {
        this.attrs.changeDisplayDate(get(this, 'displayDate').clone().subtract(1, 'month'));
      }
    },

    nextMonth() {
      if (isEmpty(get(this, 'canIncrementMonth'))) {
        this.attrs.changeDisplayDate(get(this, 'displayDate').clone().add(1, 'month'));
      }
    }
  }

});
