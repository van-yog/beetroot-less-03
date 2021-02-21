import { Store } from "./Store";

export class ReduceStore extends Store {
  constructor(dispatcher) {
    console.log("ReduceStore -> constructor -> dispatcher", dispatcher);

    super(dispatcher);
    this._history = [];
  }

  reducer(state, action) {
    throw Error("reducer must be overrride in subclasses");
  }

  onDispatch(action) {
    console.log("ReduceStore -> onDispatch -> action", action);

    const newState = this.reducer(this.state, action);
    if (newState !== this.state) {
      this._history.push(this.state);
      console.log("HISTORY = ", this._history);
      this.state = newState;
      this.emitChange();
    }
  }

  get history() {
    return this._history;
  }
  get hasHistory() {
    return this._history.length > 0;
  }
  revartLastHistory() {
    if (this.hasHistory) {
      this.state = this._history.pop();
      this.emitChange();
    }
  }
}
