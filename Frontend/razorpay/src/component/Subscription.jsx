import React, { useEffect } from "react";
import axios from "axios";

const Subscription = () => {
 
  const handlePayment = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/order/subscription", {
      userId : 1
      });

      console.log("Order Data:", data);

    } catch (error) {
      console.error("Payment Error:", error);
      alert("Error processing payment!");
    }
  };

  return <button onClick={handlePayment}>Pay Now</button>;
};

export default Subscription;
