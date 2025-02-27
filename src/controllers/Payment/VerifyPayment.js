const crypto = require("crypto");
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const VerifyPay = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature,orderId } = req.body;

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generated_signature === razorpay_signature) {

    await prisma.Payment.create({
    data:{
     razorpay_orderId :razorpay_order_id,
      razorpay_paymentId :  razorpay_payment_id,
       razorpay_signature :  razorpay_signature,
       orderId : orderId
       }
       })

      res.json({ success: true, message: "Payment verified" });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ success: false, message: "Verification failed" });
  }
}

module.exports = VerifyPay
