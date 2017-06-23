import Ember from 'ember';
const { Helper, get, inject, isEmpty } = Ember;
const { service } = inject;

export default Helper.extend({

  skuService: service('sku'),

  compute(params) {
    const skuService = get(this, 'skuService');
    const sku = params[0];
    const template = params[1];
    const fields = skuService.fieldsToHash(get(sku, 'skuFields'));

    if (isEmpty(template)) {
      return fields.name;
    }

    return Object.keys(fields).reduce(
      (title, key) => {
        let regex = new RegExp(`{{${key}}}`, 'gi');
        return title.replace(regex, fields[key])
      }, 
      template
    );
  }
});