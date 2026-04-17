// =========================
// ZERO-TRUST MEMORY ENGINE
// =========================
let tokens = {}; // ❗ memory only (never saved)
let log = [];

function addLog(msg) {
  log.push(msg);
  document.getElementById("log").innerText = log.slice(-15).join("\n");
}

// =========================
// LOAD TOKENS INTO MEMORY ONLY
// =========================
function loadTokens() {
  tokens = {
    github: document.getElementById("githubToken").value,
    supabaseUrl: document.getElementById("supabaseUrl").value,
    supabaseKey: document.getElementById("supabaseKey").value,
    mongo: document.getElementById("mongoUri").value
  };

  addLog("✔ Tokens loaded into memory (NOT stored)");
}

// =========================
// WIPE EVERYTHING
// =========================
function wipeTokens() {
  tokens = {};
  addLog("🗑 All tokens wiped from memory");
}

// =========================
// COMMAND ENGINE
// =========================
function runCommand() {
  const cmd = document.getElementById("commandInput").value.toLowerCase();

  addLog("▶ Command: " + cmd);

  if (cmd.includes("build")) addLog("⚙ Build requested");
  if (cmd.includes("supabase")) addLog("✔ Supabase detected");
  if (cmd.includes("github")) addLog("✔ GitHub detected");
  if (cmd.includes("mongo")) addLog("✔ Mongo detected");

  addLog("✔ Command processed");
}

// =========================
// API TEST ENGINE (REAL CHECKS)
// =========================
async function testTokens() {
  addLog("🧪 Starting API tests...");

  // SUPABASE TEST
  if (tokens.supabaseUrl && tokens.supabaseKey) {
    try {
      const res = await fetch(tokens.supabaseUrl + "/rest/v1/", {
        headers: {
          apikey: tokens.supabaseKey
        }
      });

      if (res.ok) {
        addLog("✔ Supabase VERIFIED");
      } else {
        addLog("❌ Supabase FAILED");
      }

    } catch (e) {
      addLog("❌ Supabase ERROR");
    }
  }

  // GITHUB CHECK (no API call, just validation)
  if (tokens.github) {
    addLog("✔ GitHub token present (not tested here)");
  }

  // MONGO (no direct HTTP test safe here)
  if (tokens.mongo) {
    addLog("✔ Mongo URI loaded (not tested live)");
  }

  addLog("✔ Testing complete");
}

// =========================
// VOICE COMMAND SYSTEM
// =========================
function startVoice() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    addLog("❌ Voice not supported");
    return;
  }

  const rec = new SpeechRecognition();
  rec.lang = "en-US";

  addLog("🎤 Listening...");

  rec.start();

  rec.onresult = (e) => {
    const text = e.results[0][0].transcript;
    document.getElementById("commandInput").value = text;
    addLog("🎤 Heard: " + text);
  };
}
