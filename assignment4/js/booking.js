export class Booking {
  constructor(house, date, days, extras, code) {
    this.house = house;
    this.date = date;
    this.days = days;
    this.extras = extras; 
    this.code = code;
  }

  isValidDate() {
    if (!this.date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [year, month, day] = this.date.split("-");
    const selectedDate = new Date(year, month - 1, day);

    if (isNaN(selectedDate)) return false;

    return selectedDate >= today;
  }

  validate() {
    if (!this.date || isNaN(this.days) ||  this.days < 1) {
      throw new Error("Fyll i alla fält");
    }

    if (!this.isValidDate()) {
      throw new Error("Datumet har redan passerat");
    }
  }

  calculateTotal() {
    const days = parseInt(this.days) || 1;
    const extras = this.extras || {};
    
    let total = this.house.pricePerNight * days;

    if (extras.breakfast) total += 100 * days;
    if (extras.tour) total += 300;
    if (extras.seance) total += 500;

    if (this.code === "GHOST20") {
      total *= 0.8;
    }

    return Math.round(total);
  }

  getConfirmation() {
    return `
    <ul>
    <li><strong>Boende: ${this.house.name}</strong></li>
    <li><strong>Datum: ${this.date}</strong></li>
    <li><strong>Antal dagar: ${this.days}</strong></li>
    <li><strong>Totalt pris: ${this.calculateTotal()} kr</strong></li>
    </ul>
    `; 
  }
}