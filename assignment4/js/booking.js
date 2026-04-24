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
    return new Date(this.date) >= today;
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
    Bokning bekräftad!
    Namn: ${this.name}
    Boende: ${this.house.name}
    Datum: ${this.date}
    Antal dagar: ${this.days}
    Totalt pris: ${this.calculateTotal()} kr
    `; 
  }
}