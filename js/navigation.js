import { assignments } from "./assignments.js";

export function createNavigation() {
    const navList = document.querySelector("nav ul");
    const currentPath = window.location.pathname.split("/").slice(-2).join("/");

    navList.innerHTML = "";

    assignments.forEach(assignment => {
        const li = document.createElement("li");
        const a = document.createElement("a");

        a.href = assignment.link;
        a.textContent = assignment.title;

        if (assignment.link=== currentPath) {
            a.classList.add("active");
        }

        li.appendChild(a);
        navList.appendChild(li);
    });
}
