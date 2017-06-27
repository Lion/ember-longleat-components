import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-form-fieldset', 'Integration | Component | ui form fieldset', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ui-form-fieldset}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ui-form-fieldset}}
      template block text
    {{/ui-form-fieldset}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
