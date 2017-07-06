import Ember from 'ember';
const { Helper, isEmpty } = Ember;

export function isMobiledocEmpty(params/*, hash*/) {
  if (isEmpty(params[0])) {
    return true;
  }

  let json = JSON.parse(params[0]);
  return (
    json.atoms.length === 0 &&
    json.cards.length === 0 &&
    json.markups.length === 0 &&
    json.sections.length === 1 &&
    json.sections[0][0] === 1 &&
    json.sections[0][1] === 'p' &&
    json.sections[0][2].length === 0
  );
}

export default Helper.helper(isMobiledocEmpty);