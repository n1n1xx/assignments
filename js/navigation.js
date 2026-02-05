import { assignments } from "./assignments.js";

export function createNavigation() {
  const navList = document.querySelector("nav ul");

  const url = new URL(window.location.href);
  const parts = url.pathname.split("/").filter(Boolean);

  // Ta bort filnamnet om det är index.html
  if (parts[parts.length - 1].endsWith(".html")) {
    parts.pop();
  }

  // parts = ["assignments"] eller ["assignments", "assignment1"]
  const depthFromRoot = parts.length - 1; // -1 för repo-namnet

  const prefix = depthFromRoot > 0 ? "../".repeat(depthFromRoot) : "";

  navList.innerHTML = "";

  assignments.forEach(assignment => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.href = prefix + assignment.link;
    a.textContent = assignment.title;

    if (window.location.pathname.endsWith(assignment.link)) {
      a.classList.add("active");
    }

    li.appendChild(a);
    navList.appendChild(li);
  });
}
