import Ember from 'ember';

const { Helper, String } = Ember;

export function safeBackgroundImage(params) {
  return String.htmlSafe(`background: url('${params[0]}') no-repeat center center / cover`);
}

export default Helper.helper(safeBackgroundImage);