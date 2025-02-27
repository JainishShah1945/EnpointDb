import React, { useEffect } from "react";
import axios from "axios";

const Checkout = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/order/create-order", {
        amount: 5,
        currency: "INR",
      });

      console.log("Order Data:", data);

      handlePaymentVerify(data);
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Error processing payment!");
    }
  };

  const handlePaymentVerify = async (data) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
      amount: data.amount,
      currency: data.currency,
      name: "NOVA CINEMA",
      description: "Booking Ticket",
      order_id: data.orderId, 
      handler: async (response) => {
        console.log("Payment Response:", response);
        try {
          const verifyRes = await axios.post("http://localhost:5000/api/order/verify", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId : data.orderId
          });

          if (verifyRes.data.success) {
            alert("Payment successful");
          } else {
            alert("Payment verification failed");
          }
        } catch (error) {
          console.error("Verification Error:", error);
          alert("Error verifying payment");
        }
      },
      prefill: {
        name: "Jainish Shah",
        email: "enpointie@example.com",
        contact: "79779397453",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return <button onClick={handlePayment}>Pay Now</button>;
};

export default Checkout;
