const {PrismaClient} = require("@Prisma/client");
const Razorpay = require("razorpay");

const prisma = new PrismaClient();
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
const Subscription = async (req,res) => {
    const {userId} = req.body;

    try{

    const subscription = await razorpay.subscriptions.create({
            plan_id : process.env.plan_Id,
            customer_notify: 1,
            total_count: 12
    });

    await prisma.subscription.create({
      data: {
        userId,
        razorpayId: subscription.id,
        status: subscription.status,
        startDate: new Date(subscription.start_at * 1000),
        endDate: new Date(subscription.charge_at * 1000),
      },
    });

    res.json({ success: true, subscription });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Subscription failed" });
  }
};

module.exports = Subscription;