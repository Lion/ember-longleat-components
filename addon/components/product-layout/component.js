import Ember from 'ember';
import layout from './template';

const { Component } = Ember;

export default Component.extend({
  
  layout,
  breadcrumbs: {isBreadcrumbs: true},
  carousel: {isCarousel: true},
  form: {isForm: true},
  details: {isDetails: true}

});
