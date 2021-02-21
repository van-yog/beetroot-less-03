class PlayList {
  constructor() {
    this.items = [];
    this.currentIndex = 0;
  }

  render(el) {
    el.innerHTML = this.items.map((item) => item.toHtml()).join("");
  }

  add(item) {
    this.items.push(item);
  }

  play() {
    const item = this.items[this.currentIndex];
    item.play();
  }

  stop() {
    const item = this.items[this.currentIndex];
    item.stop();
  }

  next() {
    this.stop();
    this.currentIndex++;
    if (this.currentIndex === this.items.length) {
      this.currentIndex = 0;
    }
    this.play();
  }
}

export default PlayList;
