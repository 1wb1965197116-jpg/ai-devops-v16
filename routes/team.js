const express = require("express");

let teams = [];

const router = express.Router();

router.post("/create", (req, res) => {
  teams.push({
    name: req.body.name,
    owner: req.body.userId,
    members: []
  });

  res.json({ status: "team created" });
});

router.post("/invite", (req, res) => {
  const team = teams.find(t => t.name === req.body.team);

  team.members.push(req.body.email);

  res.json({ status: "invited" });
});

module.exports = router;
