import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout,
  classNameBindings: [
    ':component-ui-jumbo-select',
    'isShowingPopup',
    'hasValue',
    'isDisabled'
  ],

  hasValue: Ember.computed.notEmpty('value'),

  didInsertElement() {
    this._clickListener = Ember.run.bind(this, this.clickHandler);
    Ember.$(document).on('click', this._clickListener);
  },

  willDestroyElement() {
    if (this._clickListener !== null) {
      Ember.$(document).off('click', this._clickListener);
    }
  },

  clickHandler(e) {
    if (this.$().find(e.target).length === 0) {
      Ember.run.scheduleOnce('afterRender', this, () => {
        this.set('isShowingPopup', false);
      });
    }
  },

  actions: {
    togglePopup() {
      this.toggleProperty('isShowingPopup');
    }
  }
});
