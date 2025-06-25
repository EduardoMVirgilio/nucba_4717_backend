import Order from "../models/order.js";

export const createOrder = async (req, res) => {
  try {
    const { items, shippingDetails, shippingCost } = req.body;
    const subtotal = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const total = subtotal + shippingCost;
    const order = new Order({
      user: req.user._id,
      items,
      shippingDetails,
      subtotal,
      shippingCost,
      total,
    });
    await order.save();
    res.status(201).json({ order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("user");
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
