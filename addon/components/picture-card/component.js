import Ember from 'ember';
import layout from './template';

const { Component, computed, get } = Ember;

export default Component.extend({
  layout,

  classNames: ['picture-card'],

  backgroundColour: '#060707',
  backgroundSize: 'cover',

  imageCSS: computed(
    'cardImage',
    function() {
      return new Ember.String.htmlSafe(
        "background: " + get(this, 'backgroundColour') + " url('" + get(this, 'cardImage') + "') no-repeat center center; background-size: " + get(this, 'backgroundSize') + ";"
      );
    }
  )

});
