let token = "";

async function register() {
  await fetch("/api/auth/register", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  });

  status.innerText = "Registered ✔";
}

async function login() {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  });

  const data = await res.json();
  token = data.token;

  status.innerText = "Logged in ✔";
}

async function saveProject() {
  await fetch("/api/projects", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      userId: email.value,
      name: project.value,
      mongo: mongo.value,
      apiKeys: api.value
    })
  });

  status.innerText = "Project saved ✔";
}
