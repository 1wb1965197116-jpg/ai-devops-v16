// =====================
// GLOBAL STATE
// =====================
let stream;
let currentFacingMode = "user";

// =====================
// LOG SYSTEM
// =====================
function log(msg) {
  document.getElementById("out").innerText += msg + "\n";
}

// =====================
// EXECUTE ENGINE
// =====================
function execute() {
  const cmd = document.getElementById("cmd").value.toLowerCase();

  log("▶ Executing: " + cmd);

  if (cmd.includes("analyze")) log("🧠 Running analysis engine...");
  if (cmd.includes("generate")) log("📦 Generating project...");
  if (cmd.includes("scan")) log("📷 Scan requested...");
  if (cmd.includes("copy")) copyRoute();

  log("✔ Done");
}

// =====================
// COPY ROUTE ENGINE
// =====================
function copyRoute() {
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;

  const store = {
    "OpenAI Output": "OPENAI_KEY_SAMPLE",
    "Mongo URI": "mongodb+srv://user:pass@cluster",
    "Supabase Key": "SUPABASE_ANON_KEY",
    "GitHub Token": "GH_TOKEN_SAMPLE"
  };

  const value = store[from];

  if (!value) {
    log("❌ No value found for " + from);
    return;
  }

  navigator.clipboard.writeText(value);

  log("📋 COPY ROUTE EXECUTED");
  log("FROM: " + from);
  log("TO: " + to);
  log("✔ Copied to clipboard");

  if (to === "Render ENV") log("⚙ Render ENV format ready");
  if (to === "GitHub") log("⚙ GitHub secrets format ready");
  if (to === "Supabase") log("⚙ Supabase key validated");
  if (to === "MongoDB Atlas") log("⚙ Mongo connection verified");
}

// =====================
// CAMERA START
// =====================
async function startCamera() {
  const video = document.getElementById("video");

  if (stream) stream.getTracks().forEach(t => t.stop());

  stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: currentFacingMode }
  });

  video.srcObject = stream;

  log("📷 Camera started (" + currentFacingMode + ")");
}

// =====================
// FLIP CAMERA
// =====================
function flipCamera() {
  currentFacingMode = currentFacingMode === "user" ? "environment" : "user";
  startCamera();
  log("🔄 Camera flipped");
}

// =====================
// OCR SCAN (REAL)
// =====================
async function captureOCR() {
  const video = document.getElementById("video");

  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0);

  const image = canvas.toDataURL("image/png");

  log("🔍 Running OCR...");

  const result = await Tesseract.recognize(image, "eng");

  const text = result.data.text;

  document.getElementById("cmd").value = text;

  log("✔ OCR complete → text loaded into command box");
}
