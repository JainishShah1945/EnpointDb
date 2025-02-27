const express = require("express");
const Razorpay = require("razorpay");
require("dotenv").config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const Order = async (req,res) => {
  try{
    const {amount,currency} = req.body;

    const order = await razorpay.orders.create({
      amount : amount * 100,
      currency : currency || "INR" ,
      receipt : `receipt_${Date.now()}`
      })
   res.json({
    success : true,
    orderId : order.id,
    amount : order.amount,
    currency : order.currency
    })
}catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = Order;
