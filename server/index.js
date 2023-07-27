const express = require("express");
const app = express();
const stripe = require("stripe")(
  "sk_test_51J7zuYHHLS3TcBL4kdC1gL8u5UZKiTlTm1mjp6dRLKwsRO1xsYH6WxlCX7m8zBXXbLjyqwrHunKTtX6tdDFLW43000iZEwA63A"
);
const PORT = 5000;
const bodyparser = require("body-parser");
// post request
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const uuid = require("uuid").v4;
const cors = require("cors");

app.use(cors());

app.post("/checkout", async (req, res) => {
  console.log(req.body);
  let error, status;
  try {
    const { product, token } = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const key = "25353465153165465";

    const charge = await stripe.charges.create({
      amount: product.price * 100,
      currency: "usd",
      customer: customer.id,
      receipt_email: token.email,
      description: `Purchased the ${product.name}`,
      metadata: {
        key: "25353465153165465",
      },
    });

    console.log("charge", { charge });
    status = "Success";
  } catch (error) {
    console.log(error);
    status = "failure";
  }

  res.send("hello from simple server :)");
});

app.listen(PORT, () => {
  console.log("====================================");
  console.log("APP is listening on port 5000");
  console.log("====================================");
});
