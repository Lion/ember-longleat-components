import Ember from 'ember';
const { Helper } = Ember;

export function penceToPounds(params) {
  return params[0] / 100;
}

export default Helper.helper(penceToPounds);
