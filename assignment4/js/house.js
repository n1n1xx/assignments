import { getScareText } from "./utils.js";
import { Booking } from "./booking.js";

async function fetchHouses() {
  try {
    const res = await fetch("data/houses.json");
    return await res.json();
  } catch {
    document.querySelector("#house-container").innerHTML =
      "<p class='error'>Fel vid laddning</p>";
  }
}

function getId() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("id"));
}

function renderHouse(house) {
  const container = document.querySelector("#house-container");

  container.innerHTML = `
    <h2>${house.name}</h2>
    <img src="images/${house.image}">
    <p>${house.description}</p>
    <p><strong>Plats:</strong> ${house.location}</p>
    <p><strong>Pris:</strong> ${house.pricePerNight} kr/natt</p>
    <p><strong>Skräcknivå:</strong> ${getScareText(house.scareLevel)}</p>
    <p><strong>Spöken:</strong> ${house.ghostTypes.join(", ")}</p>
    <p><strong>WiFi:</strong> ${house.hasWifi ? "Ja" : "Nej"}</p>

    <h3>Boka</h3>

    <form id="booking-form">
      <label>Datum:
        <input type="date" id="date" required>
      </label>

      <label>Dagar:
        <input type="number" id="days" min="1" value="1">
      </label>

      <label><input type="checkbox" id="breakfast"> Frukost (+100/dag)</label>
      <label><input type="checkbox" id="tour"> Spökvandring (+300)</label>
      <label><input type="checkbox" id="seance"> Seans (+500)</label>

      <input type="text" id="code" placeholder="Kampanjkod">

      <p id="total"></p>

      <button>Boka</button>
    </form>

    <div id="confirmation"></div>

    <div id="weather"></div>
  `;

  const form = document.querySelector("#booking-form");
  document.querySelector("#date").min = new Date().toISOString().split("T")[0];

  const totalEl = document.querySelector("#total");

  function updatePrice() {
    const days = parseInt(document.querySelector("#days").value);

    const extras = {
      breakfast: document.querySelector("#breakfast").checked,
      tour: document.querySelector("#tour").checked,
      seance: document.querySelector("#seance").checked
    };

    const code = document.querySelector("#code").value;

    const tempBooking = new Booking(house, "2026-01-01", days, extras, code);

    const total = tempBooking.calculateTotal();
    totalEl.textContent = `Total: ${total} kr`;
  }

  form.addEventListener("input", updatePrice);

  form.addEventListener("submit", e => {
    e.preventDefault();

    const date = document.querySelector("#date").value;
    const days = parseInt(document.querySelector("#days").value);

    const extras = {
      breakfast: document.querySelector("#breakfast").checked,
      tour: document.querySelector("#tour").checked,
      seance: document.querySelector("#seance").checked
    };

    const code = document.querySelector("#code").value;

    const booking = new Booking(house, date, days, extras, code);

    try {
      booking.validate();

      document.querySelector("#confirmation").innerHTML = `
      <h3>Bokning klar 👻</h3>
      <p>${booking.getConfirmation()}</p>
    `;
    } catch (error) {
      document.querySelector("#confirmation").innerHTML =
        `<p class="error">${error.message}</p>`;
    }
  });

  updatePrice();

  // 🌦️ API (väder)
  getWeather(house.coordinates.lat, house.coordinates.lng);
}

async function getWeather(lat, lng) {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`
    );

    const data = await res.json();

    document.querySelector("#weather").innerHTML = `
      <h3>Väder</h3>
      <p>Temperatur: ${data.current_weather.temperature}°C</p>
    `;
  } catch {
    document.querySelector("#weather").innerHTML =
      "<p class='error'>Kunde inte hämta väder</p>";
  }
}

async function init() {
  const houses = await fetchHouses();
  const id = getId();

  const house = houses.find(h => h.id === id);

  if (!house) {
    document.querySelector("#house-container").innerHTML = `
      <p class="error">Huset finns inte</p>
      <a href="index.html">Tillbaka</a>
    `;
    return;
  }

  renderHouse(house);
}

init();