import { Router } from "express";
import { createOrder, getOrders } from "../controllers/orders.js";
import protect from "../middlewares/protect.js";
import orderValidation from "../validations/order.js";
import hasErrors from "../middlewares/hasErrors.js";
const router = Router();

router.post("/", [protect, orderValidation, hasErrors], createOrder);
router.get("/", protect, getOrders);

export default router;
