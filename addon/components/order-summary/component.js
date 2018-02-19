import Ember from "ember";
import layout from "./template";
const { Component, computed, get } = Ember;
const { filterBy, notEmpty } = computed;

export default Component.extend({
  layout,

  payments: filterBy("source.payments", "isNew", false),
  hasPayments: notEmpty("payments"),
  hasPromotionLines: notEmpty("promotionLines"),
  totalBeforeDiscount: computed("source.{total,discount}", function() {
    return get(this, "source.total") - get(this, "source.discount");
  })
});
