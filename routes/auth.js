const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

// LOGIN
router.post("/login", async (req, res) => {
  const user = await User.findOne(req.body);

  if (!user) return res.status(401).send("Invalid");

  const token = jwt.sign({ id: user._id }, "secret");

  res.json({ token });
});

module.exports = router;
