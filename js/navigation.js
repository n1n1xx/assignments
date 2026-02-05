import { assignments } from "./assignments.js";

export function createNavigation() {
    const navList = document.querySelector("nav ul");
const path = window.location.pathname;

const isInSubfolder = path.includes("/assignment");
navList.innerHTML = "";

    assignments.forEach(assignment => {
        const li = document.createElement("li");
        const a = document.createElement("a");

        const basePath = isInSubfolder ? "../" :"";
        a.href = basePath + assignment.link;
        a.textContent = assignment.title;

        if (path.endsWith(assignment.link)) {
            a.classList.add("active");
        }

        li.appendChild(a);
        navList.appendChild(li);
    });
}
