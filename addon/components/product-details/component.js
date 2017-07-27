import Ember from "ember";
import layout from "./template";

const { Component, computed, get, isPresent } = Ember;

export default Component.extend({
  layout,

  classNames: ["product-details"],
  description: { isDescription: true },
  skus: [],

  hasFullPrice: computed("skus.@each.isLoaded", function() {
    // Return blank if no sku is specified
    if (!get(this, "skus.firstObject.skuFields")) {
      return;
    }

    return isPresent(
      get(this, "skus.firstObject.skuFields").findBy("data.slug", "full-price")
    );
  }),

  hasProductTitleTemplate: computed.notEmpty("productTitleTemplate"),

  priceTableFields: computed("hasFullPrice", function() {
    if (get(this, "hasFullPrice")) {
      return [
        {
          heading: "Visitor",
          path: "title",
          isStrong: true
        },
        {
          heading: "Gate Price",
          path: "fullPrice",
          hasStrikeThrough: true,
          isCentered: true,
          isStrong: false
        },
        {
          heading: "Online Price*",
          path: "price",
          isCentered: true,
          isStrong: true
        }
      ];
    }
    return [
      {
        heading: "Visitor",
        path: "title",
        isStrong: true
      },
      {
        heading: ""
      },
      {
        heading: "Price*",
        path: "price",
        isStrong: true,
        isCentered: true
      }
    ];
  }),

  priceTableData: computed(
    "productTitleTemplate",
    "skus.[]",
    "hasFullPrice",
    function() {
      // Return blank if no sku is specified
      if (!get(this, "skus.firstObject.skuFields")) {
        return;
      }

      let hasAge = isPresent(
        get(this, "skus.firstObject.skuFields").findBy("data.slug", "age")
      );

      return get(this, "skus").map(sku => {
        let title = "";
        if (get(this, "hasProductTitleTemplate")) {
          title = sku
            .get("skuFields")
            .reduce(
              (title, skuField) =>
                title.replace(
                  "{{" + skuField.get("data.slug") + "}}",
                  skuField.get("values")
                ),
              get(this, "productTitleTemplate")
            );
        } else {
          title = sku
            .get("skuFields")
            .findBy("data.slug", "title")
            .get("values");
          if (hasAge) {
            let age = sku
              .get("skuFields")
              .findBy("data.slug", "age")
              .get("values");
            title += "(${age})";
          }
        }

        if (get(this, "hasFullPrice")) {
          return {
            title: title,
            fullPrice:
              "£" +
              (sku
                .get("skuFields")
                .findBy("data.slug", "full-price")
                .get("values") / 100).toFixed(2),
            price: "£" + (sku.get("price") / 100).toFixed(2) + "*"
          };
        } else {
          return {
            title: title,
            price: "£" + (sku.get("price") / 100).toFixed(2)
          };
        }
      });
    }
  )
});
