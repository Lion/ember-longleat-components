import Ember from "ember";
import layout from "./template";

const { Component, computed, get, isPresent } = Ember;

export default Component.extend({
  layout,

  classNames: ["product-details"],
  description: { isDescription: true },
  pricing: { isPricing: true },
  shipping: { isShipping: true },
  skus: [],

  hasProductTitleTemplate: computed.notEmpty("productTitleTemplate"),

  priceTableFields: computed(function() {
    return [
      {
        heading: "Weight",
        path: "title",
        isStrong: true
      },
      {
        heading: ""
      },
      {
        heading: "Price",
        path: "price",
        isStrong: true,
        isCentered: true
      }
    ];
  }),

  priceTableData: computed(
    "skus.[]",
    function() {

      // Return blank if no sku is specified
      if (!get(this, "skus.firstObject.skuFields")) {
        return;
      }

      return get(this, "skus").map(sku => {

        let title = "";
        if (get(this, "hasProductTitleTemplate")) {
          title = sku.get("skuFields")
            .reduce(
              (title, skuField) =>
                title.replace(
                  "{{" + skuField.get("data.slug") + "}}",
                  skuField.get("values")
                ),
              get(this, "productTitleTemplate")
            );
        } else {
          title = sku.get("skuFields")
            .findBy("data.slug", "title")
            .get("values");
         
        }

        return {
            title: title,
            price: "£" + (sku.get("price") / 100).toFixed(2)
        };

      });
    }
  )
});
