// routes/payment.routes.ts

import express from "express";
import { requireAuth } from "../middleware/auth.js";
import { createOrder} from "../controllers/Payments/Order.js";
import { verifyPayment } from "../controllers/Payments/Verify_Payment.js";
import {webhookHandler} from "../controllers/Payments/Webhook.js"

const router = express.Router();

// IMPORTANT:
// raw body required for webhook signature verification
router.post("/webhook", express.raw({ type: "application/json" }), webhookHandler);

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(requireAuth);

router.post("/create-order", createOrder);
router.post("/verify", verifyPayment);



export default router;

