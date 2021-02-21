class Media {
  constructor(title, duration) {
    this.title = title;
    this.duration = duration;
    this.isPlaying = false;
  }

  play() {
    this.isPlaying = true;
  }

  stop() {
    this.isPlaying = false;
  }

  toHtml() {
    return `<div class="row py-3 ${this.isPlaying ? "current" : ""}">
              <div class="col-sm-9">${this.title} - ${this.info}</div>
              <div class="col-sm-3">${this.duration}</div>
            </div>`;
  }

  get info() {
    throw Error("Method getInfo must be overriden in subclasses");
  }
}

export default Media;
