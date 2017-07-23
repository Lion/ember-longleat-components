import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mobiledoc-image-card', 'Integration | Component | mobiledoc image card', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mobiledoc-image-card}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#mobiledoc-image-card}}
      template block text
    {{/mobiledoc-image-card}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
