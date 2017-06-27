import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-form-inset-textfield', 'Integration | Component | ui form inset textfield', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ui-form-inset-textfield}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ui-form-inset-textfield}}
      template block text
    {{/ui-form-inset-textfield}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
