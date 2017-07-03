import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('box-raised-two-columns', 'Integration | Component | box raised two columns', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{box-raised-two-columns}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#box-raised-two-columns}}
      template block text
    {{/box-raised-two-columns}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
