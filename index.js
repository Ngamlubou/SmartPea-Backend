const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: "https://ngamlubou.github.io"
}));

app.use(express.json());

const razorpay = new Razorpay({
  key_id: "rzp_test_SYuOBsX5gApP7v",
  key_secret: process.env.RAZORPAY_SECRET
});

function generateCode(prefix) {
  const num = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return prefix + num;
}

app.post("/create-order", async (req, res) => {
  try {
      const options = {
  amount: 10000,
  currency: "INR",
  receipt: "receipt_" + Date.now()
};
 const order = await razorpay.orders.create(options);

   res.json({
      order_id: order.id,
      amount: order.amount
    });

  } catch (err) {
    res.status(500).json({ error: "Order creation failed" });
  }
});

app.post("/verify-payment", (req, res) => {
    const {
      classValue,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: "Invalid signature" });
    }
  const code = generateCode(classValue);
    res.json({
      success: true,
      code: code
    });
});

app.listen(PORT);
