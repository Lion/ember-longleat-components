
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('safe-background-image', 'helper:safe-background-image', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{safe-background-image inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

