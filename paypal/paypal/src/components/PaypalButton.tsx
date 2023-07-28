import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton: React.FC = () => {
  const CLIENT_ID = "Aea_xbEXpaLZi2RKmQc14UGluybu8iWwkBEGrIFzqPOc4nug25gTJAg9JrmXF8eK1QaUSDdRWQys-sdm"; // Replace this with your actual client ID from the PayPal Developer Dashboard

  return (
    <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
      <PayPalButtons
        style={{ layout: "vertical" }} // Adjust the layout as per your preference
        createOrder={(data, actions) => {
          // Replace the following with your actual order creation logic
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: "10.00", // Replace with the amount you want to charge the user
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          // Replace the following with your actual onApprove logic
          return actions.order.capture().then((details) => {
            console.log("Transaction completed by " + details.payer.name.given_name);
            // Add any additional success actions here
          });
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
