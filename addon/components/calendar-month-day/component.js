import Ember from 'ember';
import layout from './template';
import moment from 'moment';
const { Component, computed, get, isEmpty } = Ember;

export default Component.extend({
  layout,

  classNameBindings: [
    ':calendar-month-day',
    'dayDateKey',
    'isPreviousMonth',
    'isNextMonth',
    'isSelectable',
    'isSelected',
    'day.isDisabled'
  ],

  dayDateKey: computed(
    'day',
    function() {
      return get(this, 'day.dateKey');
    }
  ),
  
  isPreviousMonth: computed(
    'day',
    'displayDate',
    function() {
      return moment.utc(get(this, 'day.day')).isBefore(get(this, 'displayDate'));
    }
  ),

  isNextMonth: computed(
    'day',
    'displayDate',
    function() {
      return moment.utc(get(this, 'day.day')).isAfter(get(this, 'displayDate').clone().endOf('month'));
    }
  ),

  isSelectable: computed(
    'day.isSelectable',
    'isPreviousMonth',
    'isNextMonth',
    function() {
      return get(this, 'day.isSelectable') &&
        get(this, 'isPreviousMonth') === false &&
        get(this, 'isNextMonth') === false;
    }
  ),

  isSelected: computed(
    'day.date',
    'selectedDate',
    function() {
      return moment.utc(get(this, 'day.day')).isSame(get(this, 'selectedDate'), 'day');
    }
  ),

  click() {
    if (isEmpty(get(this, 'selectDate'))) {
      return;
    }

    if (get(this, 'isPreviousMonth') ||
      get(this, 'isNextMonth') ||
      get(this, 'isDisabled') ||
      get(this, 'isSelectable') === false
    ) {
      return;
    }

    this.attrs.selectDate(moment.utc(get(this, 'day.day')));
  }

});