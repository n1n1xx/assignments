export class Booking {
  constructor(house) {
    this.house = house;
  }

  calculateTotal(days, extras, code) {
    let total = this.house.pricePerNight * days;

    if (extras.breakfast) total += 100 * days;
    if (extras.tour) total += 300;
    if (extras.seance) total += 500;

    if (code === "GHOST20") {
      total *= 0.8;
    }

    return Math.round(total);
  }
}