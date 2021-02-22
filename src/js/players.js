import { generate as id } from "shortid";
import { Dispatcher, ReduceStore } from "./flux";
import { data } from "./data";

/* ======== actions ===========   */
const NEW_PLAYER = "NEW_PLAYER";
const SELECT_STATUS = "SELECT_STATUS";

const newPlayerAction = (name) => ({
  type: NEW_PLAYER,
  payload: { name },
});

const selectStatusAction = (status) => ({
  type: SELECT_STATUS,
  payload: { status },
});

/* ======== store ===========   */

class PlayersReducerStore extends ReduceStore {
  getInitialState() {
    let initState = localStorage["players"]
      ? JSON.parse(localStorage["players"])
      : { players: data.players, status: -1 };

    return initState;
  }
  reducer(state, action) {
    const { type, payload } = action;
    let newState;

    switch (type) {
      case NEW_PLAYER:
        newState = { ...state, players: [...state.players] };
        newState.players.push({
          id: id(),
          name: payload.name,
          result: 0,
          status: 3,
        });
        return newState;
      case SELECT_STATUS:
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

statusSelect.value = playerStore.getState().status;

const results = document.getElementById("results");

function render(state) {
  results.innerHTML = "";
  state.players.forEach((player, idx) => {
    const { name, result, status } = player;

    results.innerHTML += `
      <tr data-status="${status}">
          <td>${idx + 1}</td>
          <td>${name}</td>
          <td>${result}</td>
          <td  >${data.statuses[status - 1].title}</td>
      </tr>
      `;
  });
  localStorage["players"] = JSON.stringify(state);
}

function renderStatus({ players, status }) {
  let tableRow = document.querySelectorAll("tr");

  tableRow.forEach(
    (tr) => (tr.className = tr.dataset.status === status ? "table-info" : "")
  );
}

render(playerStore.getState());
renderStatus(playerStore.getState());

playerStore.subscribe(render);
playerStore.subscribe(renderStatus);

/* ======== handlers ===========   */

document.addEventListener("submit", handlePlayers);
document.addEventListener("change", handlePlayers);

function handlePlayers({ target, type }) {
  switch (type) {
    case "submit":
      event.preventDefault();
      const newPlayer = target[0].value.trim();
      if (!newPlayer) {
        return;
      }
      target[0].value = "";
      playerDispatcher.dispatch(newPlayerAction(newPlayer));

      break;
    case "change":
      if (target.id !== "status-select") {
        return;
      }
      const status = target.value;
      playerDispatcher.dispatch(selectStatusAction(status));
  }
}
