import Media from "./media";

class Song extends Media {
  constructor(title, duration, artist) {
    super(title, duration);
    this.artist = artist;
  }

  get info() {
    return `Artist : ${this.artist}`;
  }
}

export default Song;
