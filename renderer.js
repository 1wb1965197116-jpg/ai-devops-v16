const fs = require("fs");
const path = require("path");

function showTab(tab) {
  document.querySelectorAll(".tab").forEach(t => t.style.display = "none");
  document.getElementById(tab).style.display = "block";
}

function analyze() {
  const mongo = document.getElementById("mongoInput").value;

  let issues = [];

  if (!mongo.includes("mongodb+srv://")) {
    issues.push("❌ Invalid Mongo URI");
  }

  if (mongo.includes("<password>")) {
    issues.push("❌ Missing password");
  }

  document.getElementById("status").innerText =
    issues.length ? issues.join("\n") : "✅ All good";
}

function fix() {
  let mongo = document.getElementById("mongoInput").value;

  if (mongo.includes("<password>")) {
    const pwd = prompt("Enter Mongo password:");
    if (pwd) {
      mongo = mongo.replace("<password>", encodeURIComponent(pwd));
    }
  }

  document.getElementById("mongoInput").value = mongo;
  document.getElementById("status").innerText = "✔ Fixed";
}

function build() {
  const project = document.getElementById("project").value || "default";
  const mongo = document.getElementById("mongoInput").value;
  const apiKeys = document.getElementById("apiInput").value;

  const folder = path.join(__dirname, "projects", project);

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }

  // ENV FILE
  const env = `DATABASE_URL=${mongo}\n${apiKeys}\nNODE_ENV=production`;

  fs.writeFileSync(path.join(folder, ".env"), env);

  // Render YAML
  const render = `
services:
  - type: web
    name: ${project}-backend
    env: node
    plan: starter
    envVars:
      - key: DATABASE_URL
        value: ${mongo}
`;

  fs.writeFileSync(path.join(folder, "render.yaml"), render);

  document.getElementById("renderOutput").innerText = render;
  document.getElementById("output").innerText =
    "Project built at:\n" + folder;

  document.getElementById("status").innerText = "✅ Build complete";
}
