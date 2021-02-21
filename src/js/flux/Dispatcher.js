class Dispatcher {
  constructor() {
    console.log("Dispatcher -> constructor ");

    this._listeners = [];
  }
  dispatch(action) {
    console.log("Dispatcher->dispatch-> START");
    this._listeners.map((l) => l(action));
  }
  register(_listener) {
    this._listeners.push(_listener);
    console.log("Dispacher->register->this.listeners:", this._listeners);
  }
}

export { Dispatcher };
