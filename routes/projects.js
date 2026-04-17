const express = require("express");
const Project = require("../models/Project");

const router = express.Router();

// SAVE PROJECT
router.post("/", async (req, res) => {
  const project = new Project(req.body);
  await project.save();

  res.json({ message: "Project saved" });
});

// GET PROJECTS
router.get("/:userId", async (req, res) => {
  const projects = await Project.find({ userId: req.params.userId });
  res.json(projects);
});

module.exports = router;
