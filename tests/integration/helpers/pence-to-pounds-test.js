
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pence-to-pounds', 'helper:pence-to-pounds', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{pence-to-pounds inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

