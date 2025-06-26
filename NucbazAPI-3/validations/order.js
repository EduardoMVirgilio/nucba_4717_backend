import { body } from "express-validator";

const orderValidation = [
  body("items")
    .isArray({ min: 1 })
    .withMessage("Items must be an array")
    .custom((value) => {
      if (
        !value.every(
          (item) =>
            item.id &&
            item.quantity &&
            item.price &&
            item.title &&
            item.description
        )
      ) {
        throw new Error(
          "Items must contain id, quantity, price, title and description"
        );
      }
      return true;
    }),
  body("shippingDetails")
    .isObject()
    .withMessage("Shipping details must be an object")
    .custom((value) => {
      if (
        !value.name ||
        !value.cellphone ||
        !value.address ||
        !value.location
      ) {
        throw new Error(
          "Shipping details must contain name, cellphone, address, and location"
        );
      }
      return true;
    }),
  body("shippingCost")
    .isNumeric()
    .withMessage("Shipping cost must be a number")
    .custom((value) => {
      if (value < 0) {
        throw new Error("Shipping cost must be a positive number");
      }
      return true;
    }),
];

export default orderValidation;
