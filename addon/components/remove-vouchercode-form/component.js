import Ember from "ember";
import layout from "./template";
const { Component, get } = Ember;

export default Component.extend({
  layout,

  promotionLine: null,

  actions: {
    submit() {
      let promotionLine = get(this, "promotionLine");
      const basket = get(promotionLine, "basket.content");
      return this.removePromotion(promotionLine).then(() => basket.reload());
    }
  }
});
