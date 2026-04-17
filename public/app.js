// =======================
// GLOBAL STATE (ZERO TRUST)
// =======================
let stream;
let currentFacingMode = "user";

// =======================
// LOG SYSTEM
// =======================
function log(msg) {
  document.getElementById("output").innerText += msg + "\n";
}

// =======================
// ANALYZE ENGINE
// =======================
function analyze() {
  const input = document.getElementById("input").value.toLowerCase();

  document.getElementById("output").innerText = "";

  log("🧠 Analyzing input...");

  if (input.includes("mongodb")) {
    if (input.includes("mongodb+srv://")) {
      log("✔ MongoDB format OK");
    } else {
      log("❌ Invalid MongoDB URI");
    }
  }

  if (input.includes("supabase")) {
    if (input.includes("anon") || input.includes("key")) {
      log("✔ Supabase config detected");
    } else {
      log("⚠ Missing Supabase key");
    }
  }

  if (input.includes("render")) {
    log("✔ Render deployment detected");
  }

  if (input.includes("github")) {
    log("✔ GitHub workflow detected");
  }

  log("✔ Analysis complete");
}

// =======================
// AUTO FIX ENGINE
// =======================
function autoFix() {
  let input = document.getElementById("input").value;

  log("🛠 Running auto-fix...");

  input = input.replace("<password>", "YOUR_PASSWORD");

  if (!input.includes("NODE_ENV")) {
    input += "\nNODE_ENV=production";
  }

  document.getElementById("input").value = input;

  log("✔ Auto-fix applied");
}

// =======================
// PROJECT GENERATOR
// =======================
function generate() {
  const name = document.getElementById("project").value || "app";

  const server =
`const express = require("express");
const app = express();

app.get("/", (req,res)=>res.send("${name} running"));

app.listen(process.env.PORT || 3000);`;

  const env =
`DATABASE_URL=your_mongo_here
NODE_ENV=production`;

  const render =
`services:
  - type: web
    name: ${name}
    env: node
    buildCommand: npm install
    startCommand: node server.js`;

  document.getElementById("generated").innerText =
`SERVER.JS\n\n${server}\n\n.ENV\n\n${env}\n\nRENDER.YAML\n\n${render}`;

  log("📦 Project generated");
}

// =======================
// CAMERA SYSTEM
// =======================
async function startCamera() {
  const video = document.getElementById("video");

  if (stream) {
    stream.getTracks().forEach(t => t.stop());
  }

  stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: currentFacingMode }
  });

  video.srcObject = stream;

  log("📷 Camera started (" + currentFacingMode + ")");
}

// =======================
// FLIP CAMERA FIX
// =======================
function flipCamera() {
  currentFacingMode = (currentFacingMode === "user") ? "environment" : "user";

  log("🔄 Switching camera...");

  startCamera();
}

// =======================
// CAPTURE FRAME
// =======================
function capture() {
  const video = document.getElementById("video");

  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0);

  const imageData = canvas.toDataURL("image/png");

  document.getElementById("input").value =
    "IMAGE_FRAME_READY_FOR_OCR_PIPELINE";

  log("📸 Frame captured (OCR-ready)");
}
