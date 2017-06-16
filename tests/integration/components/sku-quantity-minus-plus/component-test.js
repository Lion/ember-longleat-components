import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sku-quantity-minus-plus', 'Integration | Component | sku quantity minus plus', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{sku-quantity-minus-plus}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#sku-quantity-minus-plus}}
      template block text
    {{/sku-quantity-minus-plus}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
