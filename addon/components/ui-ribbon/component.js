import Ember from 'ember';
import layout from './template';

const { Component } = Ember;

let component = Component.extend({
  layout,
  classNames: ['ui-ribbon']
});

component.reopenClass({
  positionalParams: ['label']
});

export default component;