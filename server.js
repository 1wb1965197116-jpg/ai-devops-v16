const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static("public"));

// AI “mock copilot engine”
app.post("/analyze", (req, res) => {
  const input = req.body.input.toLowerCase();

  let result = {
    issues: [],
    suggestions: []
  };

  if (input.includes("mongodb")) {
    if (!input.includes("mongodb+srv://")) {
      result.issues.push("Invalid MongoDB URI");
      result.suggestions.push("Use mongodb+srv:// format");
    } else {
      result.suggestions.push("MongoDB format OK");
    }
  }

  if (input.includes("supabase")) {
    if (!input.includes("anon")) {
      result.issues.push("Missing Supabase anon key");
      result.suggestions.push("Add anon/public key");
    }
  }

  if (input.includes("render")) {
    result.suggestions.push("Render deployment detected");
  }

  res.json(result);
});

app.post("/generate", (req, res) => {
  const name = req.body.name || "app";

  res.json({
    server:
`const express = require("express");
const app = express();

app.get("/", (req,res)=>res.send("${name} running"));

app.listen(process.env.PORT || 3000);`,

    env:
`DATABASE_URL=your_mongo_here
NODE_ENV=production`,

    render:
`services:
  - type: web
    name: ${name}
    env: node
    buildCommand: npm install
    startCommand: node server.js`
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Running"));
