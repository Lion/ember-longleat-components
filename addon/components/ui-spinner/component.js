import Ember from 'ember';
const { Component, computed, get, String } = Ember;

export default Component.extend({

  classNames: ['ui-spinner'],
  attributeBindings: ['style'],

  tagName: 'span',

  width: '50px',
  height: '50px',
  borderWidth: '3px',
  color: '#fff',

  style: computed(
    'width',
    'height',
    'borderWidth',
    'color',
    function() {
      const width = get(this, 'width');
      const height = get(this, 'height');
      const borderWidth = get(this, 'borderWidth');
      const color = get(this, 'color');
      return String.htmlSafe(
        `width: ${width}; height: ${height}; border: solid ${color}; border-width: ${borderWidth} 0 0 0;`
      );
    }
  )

});
