const express = require("express");
const stripeService = require("../services/stripe");

const router = express.Router();

router.post("/checkout", async (req, res) => {
  const url = await stripeService.createCheckout(req.body.email);
  res.json({ url });
});

module.exports = router;
