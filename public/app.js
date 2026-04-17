// =====================
// ANALYZE ENGINE (AI)
// =====================
async function analyze() {
  const input = document.getElementById("input").value;

  const res = await fetch("/analyze", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ input })
  });

  const data = await res.json();

  document.getElementById("output").innerText =
    "❌ Issues:\n" + data.issues.join("\n") +
    "\n\n🧠 Suggestions:\n" + data.suggestions.join("\n");
}

// =====================
// AUTO FIX (client-side enhancer)
// =====================
function autoFix() {
  let input = document.getElementById("input").value;

  input = input.replace("<password>", "YOUR_PASSWORD");

  if (!input.includes("NODE_ENV")) {
    input += "\nNODE_ENV=production";
  }

  document.getElementById("input").value = input;

  document.getElementById("output").innerText =
    "✔ Auto-fix applied locally";
}

// =====================
// GENERATOR ENGINE
// =====================
async function generate() {
  const name = document.getElementById("project").value;

  const res = await fetch("/generate", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ name })
  });

  const data = await res.json();

  document.getElementById("generated").innerText =
    "SERVER.JS\n\n" + data.server +
    "\n\n.ENV\n\n" + data.env +
    "\n\nRENDER.YAML\n\n" + data.render;
}
