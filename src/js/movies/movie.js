import Media from "./media";

class Movie extends Media {
  constructor(title, duration, year) {
    super(title, duration);
    this.year = year;
  }

  get info() {
    return `Year : ${this.year}`;
  }
}

export default Movie;
