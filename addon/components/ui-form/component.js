import Ember from 'ember';
import layout from './template';
const { Component } = Ember;

export default Component.extend({
  layout,
  tagName: 'form',
  method: null,
  action: null,
  attributeBindings: ['action', 'method']
});
