import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mobiledoc-video-embed-card', 'Integration | Component | mobiledoc video embed card', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mobiledoc-video-embed-card}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#mobiledoc-video-embed-card}}
      template block text
    {{/mobiledoc-video-embed-card}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
