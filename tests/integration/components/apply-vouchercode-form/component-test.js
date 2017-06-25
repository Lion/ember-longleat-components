import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('apply-vouchercode-form', 'Integration | Component | apply vouchercode form', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{apply-vouchercode-form}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#apply-vouchercode-form}}
      template block text
    {{/apply-vouchercode-form}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
