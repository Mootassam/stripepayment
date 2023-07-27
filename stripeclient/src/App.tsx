import React, { useState } from "react";
import "./App.css";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";
function App() {
  const [product] = useState({
    name: "Sample Game",
    price: 20000,
    description: "This is a sample game",
  });
  async function handleToken(token) {
    const response = await axios.post("http://localhost:5000/checkout", {
      token,
      product,
    });
    if (response.status === 200) {
      toast("Success Payment is completed", { type: "success" });
    } else {

      toast("Failure payment is not completedx", { type: "error" });

    }
  }

  return (
    <div className="app">
      <div className="container">
        <h1 className="text--center"> Payment Checkout Demo</h1>
        <br />

        <div className="form-group container">
          <StripeCheckout
            stripeKey="pk_test_51J7zuYHHLS3TcBL4vm2rQ7YqmjaSws8I8VVCMIhYwJ13dHZ1jVM4lAf4bmjjROxmekFokUyIVtYqiitVf6rxsZbt00bgRV6Htd"
            token={handleToken} // Function called after successful payment
            // Replace with your Stripe publishable key
            amount={product.price} // Amount in cents (e.g., 1000 = $10.00)
            name="Your Company Name"
            description="Sample Product Description"
            currency="USD"
            bitcoin
          />
        </div>
      </div>
    </div>
  );
}

export default App;
