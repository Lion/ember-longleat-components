import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('basket-items-summary', 'Integration | Component | basket items summary', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{basket-items-summary}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#basket-items-summary}}
      template block text
    {{/basket-items-summary}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
