import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('heading-group-strong', 'Integration | Component | heading group strong', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{heading-group-strong}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#heading-group-strong}}
      template block text
    {{/heading-group-strong}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
