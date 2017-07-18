import Ember from "ember";
import layout from "./template";
const { Component, computed, get, isPresent, set } = Ember;
const { alias, and, not, notEmpty, oneWay } = computed;

export default Component.extend({
  layout,

  classNameBindings: [
    "isActivated",
    "showMiniLabel",
    "hasError",
    "isValid",
    "canClear"
  ],

  notValidating: not("validations.isValidating"),
  didValidate: oneWay("targetObject.didValidate"),
  hasContent: notEmpty("value"),
  isValid: and("hasContent", "validations.isValid", "notValidating"),
  isInvalid: oneWay("validations.isInvalid"),
  hasError: alias("showMessage"),
  hasTextfieldMessage: notEmpty("textfieldMessage"),
  canClear: and("isActivated", "hasContent"),
  showErrorClass: and(
    "notValidating",
    "showMessage",
    "hasContent",
    "validations"
  ),

  showMessage: computed(
    "validations.isDirty",
    "isInvalid",
    "didValidate",
    function() {
      return (
        (get(this, "validations.isDirty") || get(this, "didValidate")) &&
        get(this, "isInvalid")
      );
    }
  ),

  showMiniLabel: computed("isActivated", "value", function() {
    return get(this, "isActivated") || isPresent(get(this, "value"));
  }),

  actions: {
    clear() {
      set(this, "value", null);
    }
  },

  focusIn() {
    set(this, "isActivated", true);
  }
});
