import { getScareText } from "./utils.js";

let allHouses = [];

async function fetchHouses() {
  try {
    const res = await fetch("data/houses.json");
    return await res.json();
  } catch {
    document.body.innerHTML = "<p class='error'>Fel vid laddning</p>";
  }
}

function renderHouses(houses) {
  const container = document.querySelector("#houses-container");
  container.innerHTML = "";

  if (houses.length === 0) {
    container.innerHTML = "<p>Inga hus hittades</p>";
    return;
  }

  houses.forEach(h => {
    container.innerHTML += `
      <div class="house">
        <img src="images/${h.image}">
        <h3>${h.name}</h3>
        <p>${h.location}</p>
        <p>${h.pricePerNight} kr</p>
        <p>${getScareText(h.scareLevel)}</p>
        <a href="house.html?id=${h.id}">Läs mer</a>
      </div>
    `;
  });
}

function setupFilters(houses) {
  const ghostSet = new Set();

  houses.forEach(h => h.ghostTypes.forEach(g => ghostSet.add(g)));

  const ghostSelect = document.querySelector("#ghost");
  ghostSet.forEach(g => {
    ghostSelect.innerHTML += `<option value="${g}">${g}</option>`;
  });
}

function filterHouses() {
  const price = document.querySelector("#price").value;
  const scare = document.querySelector("#scare").value;
  const ghost = document.querySelector("#ghost").value;
  const wifi = document.querySelector("#wifi").checked;

  const filtered = allHouses.filter(h =>
    h.pricePerNight <= price &&
    h.scareLevel >= scare &&
    (ghost === "all" || h.ghostTypes.includes(ghost)) &&
    (!wifi || h.hasWifi)
  );

  renderHouses(filtered);
}

async function init() {
  allHouses = await fetchHouses();
  renderHouses(allHouses);
  setupFilters(allHouses);

  document.querySelector("#filter-form").addEventListener("input", filterHouses);

  const scareInput = document.querySelector("#scare");
  const scareValue = document.querySelector("#scare-value");

  scareInput.addEventListener("input", () => {
    scareValue.textContent = getScareText(scareInput.value);
  });
}

init();