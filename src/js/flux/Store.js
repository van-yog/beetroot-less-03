export class Store {
  constructor(dispatcher) {
    console.log("Store->constructor");
    this._listeners = [];
    this.state = this.getInitialState();

    console.log("Store -> constructor -> dispatcher", dispatcher);
    dispatcher.register(this.onDispatch.bind(this));
  }

  getInitialState() {
    console.log("Store -> getInitialState -> getInitialState");
    throw Error("getInitialState must be overriden in subclasses");
  }
  onDispatch(action) {
    console.log("Store -> onDispatch -> action", action);

    throw Error("onDispatch must be overriden in subclasses");
  }
  subscribe(listener) {
    console.log("Store -> subscribe -> listener", listener);

    this._listeners.push(listener);
  }
  emitChange() {
    console.log("Store -> emitChange -> emitChange");
    this._listeners.forEach((l) => l(this.state));
  }
  getState() {
    console.log("Store -> getState -> getState");

    return this.state;
  }
}
