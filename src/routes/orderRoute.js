const express = require("express");
const Order = require("../controllers/Payment/Order.js");
const VerifyPay = require("../controllers/Payment/VerifyPayment.js");
const Subscription = require("../controllers/Payment/Subscription.js");
 const SubscriptionStatus =require("../controllers/Payment/SubCheck.js");
 const Renew =require("../controllers/Payment/SubscriptionRenew.js");

const router = express.Router();

router.post("/create-order",Order);
router.post("/verify",VerifyPay);
router.post("/subscription",Subscription);
router.post("/webhook",Renew);
router.get("/status/:userId", SubscriptionStatus);

module.exports = router;