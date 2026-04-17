// =====================
// AI ENGINE CORE
// =====================
function analyze() {
  const input = document.getElementById("input").value.toLowerCase();

  let out = [];

  if (input.includes("mongodb")) {
    out.push(input.includes("mongodb+srv://")
      ? "✔ Mongo format OK"
      : "❌ Mongo format invalid");
  }

  if (input.includes("supabase")) {
    out.push(input.includes("anon")
      ? "✔ Supabase key detected"
      : "⚠ Missing Supabase anon key");
  }

  if (input.includes("render")) {
    out.push("✔ Render deployment detected");
  }

  document.getElementById("output").innerText = out.join("\n");
}

// =====================
// AUTO FIX ENGINE
// =====================
function autoFix() {
  let input = document.getElementById("input").value;

  input = input.replace("<password>", "YOUR_PASSWORD");

  if (!input.includes("NODE_ENV")) {
    input += "\nNODE_ENV=production";
  }

  document.getElementById("input").value = input;

  document.getElementById("gen").innerText =
    "✔ Auto-fixed configuration generated";
}

// =====================
// CAMERA SYSTEM
// =====================
let stream;

async function startCamera() {
  const video = document.getElementById("video");

  stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;

  document.getElementById("output").innerText =
    "📷 Camera started";
}

function capture() {
  const video = document.getElementById("video");

  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0);

  const imageData = canvas.toDataURL("image/png");

  document.getElementById("input").value =
    "IMAGE_CAPTURED_DATA_READY_FOR_OCR_ANALYSIS";

  document.getElementById("output").innerText =
    "📷 Frame captured (ready for OCR pipeline)";
}
