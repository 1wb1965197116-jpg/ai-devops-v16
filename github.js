const simpleGit = require("simple-git");
const path = require("path");

async function pushToGitHub(projectPath) {
  const git = simpleGit(projectPath);

  try {
    await git.init();
    await git.add(".");
    await git.commit("Initial commit from AI DevOps v14");

    const repoUrl = prompt("Enter your GitHub repo URL:");

    if (!repoUrl) return "❌ No repo URL";

    await git.addRemote("origin", repoUrl);
    await git.push("origin", "main");

    return "✅ Pushed to GitHub";
  } catch (err) {
    return "❌ Git error: " + err.message;
  }
}

module.exports = { pushToGitHub };
