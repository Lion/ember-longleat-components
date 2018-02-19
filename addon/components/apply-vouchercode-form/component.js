import Ember from "ember";
import layout from "./template";
const { Component, computed, get, isBlank, set } = Ember;
const { notEmpty } = computed;

export default Component.extend({
  layout,
  code: "",
  errors: null,

  hasError: notEmpty("errors"),

  actions: {
    submit() {
      const code = get(this, "code").trim();
      let errors = [];

      if (isBlank(code)) {
        errors.pushObject({ title: "IS_EMPTY" });
        set(this, "errors", errors);
        return;
      }

      if (code.substring(0, 2).toLowerCase() == "cg") {
        errors.pushObject({ title: "IS_TESCO" });
        set(this, "errors", errors);
        return;
      }

      this.applyPromotion(code);
    }
  }
});
