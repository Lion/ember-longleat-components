import Ember from "ember";
import layout from "./template";
const { Component, isPresent, computed, get, set } = Ember;
const {
  alias,
  and,
  empty,
  filter,
  filterBy,
  equal,
  not,
  notEmpty,
  or
} = computed;

export default Component.extend({
  layout,

  isVouchercodeFieldShowable: false,

  isBasketEmpty: empty("basketItems"),
  hasBasketItems: notEmpty("basketItems"),
  isShowingRemoveVouchercode: alias("hasVouchercode"),
  hasVouchercode: notEmpty("promotionLines"),
  hasNoVouchercode: not("hasVouchercode"),
  hasAPVoucherCode: equal("vouchercode.content.code", "ANNUALPASSHOLDER"),
  visibleBasketItems: filterBy("basketItems", "isHidden", false),
  hasTescoTickets: notEmpty("tescoTickets"),
  isShowingVouchercodeField: or("isVouchercodeFieldShowable", "hasVouchercode"),

  isShowingApplyVouchercode: and(
    "isVouchercodeFieldShowable",
    "hasNoVouchercode"
  ),

  tescoTickets: filter("basketItems", function(basketItem) {
    const isTescoField = get(basketItem, "sku.product.productFields").findBy(
      "slug",
      "is-tesco"
    );

    return isPresent(isTescoField) && get(isTescoField, "values") == true;
  }),

  init() {
    this._super(...arguments);
    set(this, "code", "");
    if (isPresent(get(this, "vouchercode"))) {
      set(this, "code", get(this, "vouchercode.code"));
    }
  },

  actions: {
    showVouchercodeField() {
      set(this, "isVouchercodeFieldShowable", true);
    }
  }
});
