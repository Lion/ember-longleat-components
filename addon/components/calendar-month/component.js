import Ember from 'ember';
import layout from './template';
const { Component, computed } = Ember;

export default Component.extend({
  layout,
  classNames: ['calendar-month'],

  daysOfWeek: computed(
    function() {
      return [
        moment().weekday(0),
        moment().weekday(1),
        moment().weekday(2),
        moment().weekday(3),
        moment().weekday(4),
        moment().weekday(5),
        moment().weekday(6)
      ];
    }
  )

});

