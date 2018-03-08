import Ember from "ember";
import layout from "./template";
const { Component, computed, get, isPresent } = Ember;
const { alias, and, not, notEmpty, oneWay } = computed;

export default Component.extend({
  layout,

  classNameBindings: [":ui-form-checkbox", "hasError", "isValid"],

  notValidating: not("validations.isValidating"),
  didValidate: oneWay("target.didValidate"),
  hasContent: notEmpty("isChecked"),
  isValid: and("hasContent", "validations.isValid", "notValidating"),
  isInvalid: oneWay("validations.isInvalid"),
  showErrorClass: and(
    "notValidating",
    "showMessage",
    "hasContent",
    "validations"
  ),
  hasError: alias("showMessage"),

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

  actions: {
    toggleValue() {
      this.toggleProperty("isChecked");
      if (isPresent(this.attrs.setValue)) {
        this.setValue(get(this, "isChecked"));
      }
    }
  }
});
