/* eslint ember/no-observers: 0 */
import Ember from 'ember';
import layout from './template';
import creditCardType from '../../utils/credit-card-type';

const { Component, computed, get, observer, set } = Ember;
const { and, not, notEmpty } = computed;

export default Component.extend({
  layout,

  expiryMonth: null,
  expiryYear: null,
  validFromMonth: null,
  validFromYear: null,

  isCardNumberValid: notEmpty("payment.cardNumber"),
  isCardholderValid: notEmpty("payment.cardholder"),
  isExpiryDateValid: notEmpty("payment.expiryDate"),
  isCVCValid: notEmpty("payment.cvv"),
  canSubmit: and("isCardNumberValid", "isCardholderValid", "isExpiryDateValid", "isCVCValid"),
  cannotSubmit: not("canSubmit"),

  cardNumberChanges: observer(
    "payment.cardNumber",
    function() {
      const cardNumber = get(this, "payment.cardNumber").replace(/\s+/g, '');
      const cardType = creditCardType(cardNumber);
      set(this, "payment.cardType", cardType);
    }
  ),
  
  expiryDateChanged: observer(
    "expiryMonth",
    "expiryYear",
    function() {
      set(this, "payment.expiryDate", get(this, "expiryMonth") + get(this, "expiryYear"));
    }
  ),

  validFromChanged: observer(
    "validFromMonth",
    "validFromYear",
    function() {
      set(this, "payment.validFrom", get(this, "validFromMonth") + get(this, "validFromYear"));
    }
  ),
});
