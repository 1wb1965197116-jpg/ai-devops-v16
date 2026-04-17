// =====================
// LOG SYSTEM
// =====================
function log(msg) {
  document.getElementById("out").innerText += msg + "\n";
}

// =====================
// EXECUTE BUTTON ENGINE
// =====================
function execute() {
  const cmd = document.getElementById("cmd").value.toLowerCase();

  log("▶ Executing: " + cmd);

  if (cmd.includes("analyze")) log("🧠 Running analysis...");
  if (cmd.includes("generate")) log("📦 Generating project...");
  if (cmd.includes("scan")) log("🔍 Scanning system...");

  if (cmd.includes("copy route")) {
    log("📋 Redirecting to Copy Route engine...");
    copyRoute();
  }

  log("✔ Execution complete");
}

// =====================
// COPY ROUTE ENGINE
// =====================
function copyRoute() {
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;

  let value = "";

  // MOCK DATA SOURCE (replace later with real bindings)
  const store = {
    "OpenAI Output": "OPENAI_SAMPLE_KEY_123",
    "Mongo URI": "mongodb+srv://user:pass@cluster",
    "Supabase Key": "SUPABASE_ANON_KEY_ABC",
    "GitHub Token": "GH_TOKEN_987"
  };

  value = store[from];

  if (!value) {
    log("❌ No data found in source: " + from);
    return;
  }

  navigator.clipboard.writeText(value);

  log("📍 COPY ROUTE EXECUTED");
  log("FROM: " + from);
  log("TO: " + to);
  log("✔ Value copied to clipboard");

  // simulate destination formatting
  if (to === "Render ENV") {
    log("⚙ Formatted for Render ENV");
  }

  if (to === "GitHub") {
    log("⚙ Ready for GitHub Secrets paste");
  }

  if (to === "MongoDB Atlas") {
    log("⚙ Mongo connection string format verified");
  }

  if (to === "Supabase") {
    log("⚙ Supabase key format validated");
  }

  log("✔ Route complete");
}
