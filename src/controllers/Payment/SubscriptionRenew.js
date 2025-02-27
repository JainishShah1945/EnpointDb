const {PrismaClient} = require("@prisma/client");
const crypto = require("crypto");

const prisma = new PrismaClient();

const Renew =  async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers["x-razorpay-signature"];
  const body = JSON.stringify(req.body);

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  if (signature !== expectedSignature) {
    return res.status(400).json({ success: false, message: "Invalid signature" });
  }

  const event = req.body.event;
  const subscriptionId = req.body.payload.subscription.entity.id;
  const status = req.body.payload.subscription.entity.status;

  if (event === "subscription.charged") {
    await prisma.subscription.update({
      where: { razorpayId: subscriptionId },
      data: { status },
    });
  } else if (event === "subscription.cancelled") {
    await prisma.subscription.update({
      where: { razorpayId: subscriptionId },
      data: { status: "cancelled" },
    });
  }

  res.json({ success: true });
};

module.exports = Renew;