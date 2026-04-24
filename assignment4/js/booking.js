export class Booking {
  constructor(house, name, date, days, extras, code) {
    this.house = house;
    this.name = name;
    this.date = date;
    this.days = days;
    this.extras = extras; 
    this.code = code;
  }

  isValidDate() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(this.date);

    if (isNaN(selectedDate)) return false;

    return selectedDate >= today;
  }

  validate() {
    if (!this.name || !this.date || !this.days) {
      throw new Error("Fyll i alla fält");
    }

    if (!this.isValidDate()) {
      throw new Error("Datumet har redan passerat");
    }
  }

  calculateTotal() {
    let total = this.house.pricePerNight * this.days;

    if (this.extras.breakfast) total += 100 * this.days;
    if (this.extras.tour) total += 300;
    if (this.extras.seance) total += 500;

    if (this.code === "GHOST20") {
      total *= 0.8;
    }

    return Math.round(total);
  }

  getConfirmation() {
    return `
    <ul>
    <li><strong>Namn: ${this.name}</strong></li>
    <li><strong>Boende: ${this.house.name}</strong></li>
    <li><strong>Datum: ${this.date}</strong></li>
    <li><strong>Antal dagar: ${this.days}</strong></li>
    <li><strong>Totalt pris: ${this.calculateTotal()} kr</strong></li>
    </ul>
    `; 
  }
}