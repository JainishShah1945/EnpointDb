const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const SubscriptionStatus = async (req, res) => {
  let { userId } = req.params;

  userId = parseInt(userId,10);

  try {
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
    });

    if (!subscription || subscription.status !== "created") {
      return res.json({ active: false, message: "Subscription inactive" });
    }

    res.json({ active: true, subscription });
  } catch (error) {
    console.error("Error fetching subscription status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = SubscriptionStatus;
