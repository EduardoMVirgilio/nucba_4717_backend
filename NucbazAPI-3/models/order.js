import { Schema, model } from "mongoose";

const orderItemSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

// const orderItemSchema = new Schema({
//   product: { type: Schema.Types.ObjectId, ref: "Product" },
//   quantity: { type: Number, required: true },
//   price: { type: Number, required: true },
// });

const shippingSchema = new Schema({
  name: { type: String, required: true },
  cellphone: { type: String, required: true },
  address: { type: String, required: true },
  location: { type: String, required: true },
});

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  items: { type: [orderItemSchema], required: true },
  shippingDetails: { type: shippingSchema, required: true },
  subtotal: { type: Number, required: true },
  shippingCost: { type: Number, required: true },
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Order = model("Order", orderSchema);

export default Order;
