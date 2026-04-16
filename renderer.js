const fs = require("fs");
const path = require("path");
const { pushToGitHub } = require("./github");

let projectPath = "";

function getProjectFolder() {
  const name = document.getElementById("project").value || "default";
  projectPath = path.join(__dirname, "projects", name);

  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath, { recursive: true });
  }

  return projectPath;
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
    issues.length ? issues.join("\n") : "✅ Ready";
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
  const folder = getProjectFolder();
  const mongo = document.getElementById("mongoInput").value;

  // ENV
  fs.writeFileSync(
    path.join(folder, ".env"),
    `DATABASE_URL=${mongo}\nNODE_ENV=production`
  );

  // Render YAML
  const render = `
services:
  - type: web
    name: ${path.basename(folder)}-backend
    env: node
    plan: starter
    envVars:
      - key: DATABASE_URL
        value: ${mongo}
`;

  fs.writeFileSync(path.join(folder, "render.yaml"), render);

  document.getElementById("status").innerText = "✅ Build Complete";
}

async function pushGit() {
  const folder = getProjectFolder();

  const result = await pushToGitHub(folder);

  document.getElementById("status").innerText = result;
}
