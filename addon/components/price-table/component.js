import Ember from 'ember';
import layout from './template';

const { Component, computed } = Ember;

export default Component.extend({
  layout,

  classNameBindings: [
    ':price-table',
    'rowsAreSelectable'
  ],

  rowsAreSelectable: computed.notEmpty('selectRow'),
  selectRow: null,
  showTable: computed.notEmpty('data'),

  actions: {
    selectRow(data) {
      if (this.selectRow) {
        this.selectRow(data);
      }
    }
  }
});
