const price = new Intl.NumberFormat({
  style: "currency",
  currency: "USD",
});
export const formatPrice = (value) => price.format(value);
