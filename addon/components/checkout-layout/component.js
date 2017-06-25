import Ember from 'ember';
import layout from './template';
const { Component } = Ember;

export default Component.extend({
  layout,
  majorContent: {isMajorContent: true},
  minorContent: {isMinorContent: true},
});
