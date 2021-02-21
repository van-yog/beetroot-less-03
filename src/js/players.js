import { generate as id } from "shortid";
// import { createAction } from "@reduxjs/toolkit";
import { Dispatcher, ReduceStore } from "./flux";
import { data } from "./data";

/* ======== actions ===========   */
const NEW_PLAYER = "NEW_PLAYER";
const SELECT_STATUS = "SELECT_STATUS";

const newPlayerAction = (name) => ({
  type: NEW_PLAYER,
  payload: { id: id(), name, result: 0, status: 1 },
});

const selectStatusAction = (status) => {
  console.log("selectStatusAction->status:", status);
  return {
    type: SELECT_STATUS,
    payload: { status },
  };
};

/* ======== store ===========   */

class PlayersReducerStore extends ReduceStore {
  getInitialState() {
    let initState = localStorage["preference"]
      ? JSON.parse(localStorage["preference"])
      : { players: data.players, status: 0 };
    console.log("PlayersReducerStore -> getInitialState ", initState);

    return initState;
  }
  reducer(state, action) {
    console.log("PlayersReducerStore -> reducer ", action);
    const { type, payload } = action;
    let newState;

    switch (type) {
      case NEW_PLAYER:
        console.log("NEW_PLAYER");
        newState = { ...state, players: [...state.players] };
        newState.players.push({
          id: id(),
          name: payload.name,
          result: 0,
          status: 3,
        });
        return newState;
      case SELECT_STATUS:
        console.log("SELECT_STATUS");
        newState = { ...state, players: [...state.players] };
        newState.status = payload.status;
        return newState;
      default:
        return state;
    }
  }
}

const playerDispatcher = new Dispatcher();
const playerStore = new PlayersReducerStore(playerDispatcher);
window.store = playerStore;

console.log(playerStore.getState());

/* ======== View ===========   */
const statusSelect = document.getElementById("status-select");

data.statuses.forEach(
  (status) =>
    (statusSelect.innerHTML += `<option value="${status.id}">${status.title}</option>`)
);

const results = document.getElementById("results");

function render(state) {
  console.log("Render->state'", state);
  results.innerHTML = "";
  state.players.forEach((player, idx) => {
    const { name, result, status } = player;
    console.log("statusSelect.value ", statusSelect.value);
    console.log("data.statuses[status - 1]", data.statuses[status - 1].id);
    console.log(+statusSelect.value === data.statuses[status - 1].id);
    results.innerHTML += `
      <tr class=${
        +statusSelect.value === data.statuses[status - 1].id ? "table-info" : ""
      }>
          <td>${idx + 1}</td>
          <td>${name}</td>
          <td>${result}</td>
          <td >${data.statuses[status - 1].title}</td>
      </tr>
      `;
  });
  localStorage["preference"] = JSON.stringify(state);
}

render(playerStore.getState());
playerStore.subscribe(render);

/* ======== handlers ===========   */

document.addEventListener("submit", handlePlayers);
document.addEventListener("change", handlePlayers);

function handlePlayers({ target, type }) {
  console.log("handlePlayers !");
  switch (type) {
    case "submit":
      event.preventDefault();
      const newPlayer = target[0].value.trim();
      if (!newPlayer) {
        return;
      }
      target[0].value = "";
      playerDispatcher.dispatch(newPlayerAction(newPlayer));
      console.log(newPlayerAction(newPlayer));

      break;
    case "change":
      if (target.id !== "status-select") {
        return;
      }
      const status = target.value;
      console.log("CHANGE, VALUE ", status);
      playerDispatcher.dispatch(selectStatusAction(status));
      console.log(selectStatusAction(status));
  }
}
