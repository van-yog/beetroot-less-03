import { createSlice, configureStore } from "@reduxjs/toolkit";
import { messages } from "./data";

const initialState = {
  messages,
  userStatus: "online",
};

const slice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    messageCreated: (state, action) => {
      state.messages.push(action.payload);
    },
    statusUpdated: (state, action) => {
      state.userStatus = action.payload.value;
    },
  },
});

const store = configureStore({ reducer: slice.reducer });
const { messageCreated, statusUpdated } = slice.actions;

store.subscribe(render);
window.store = store;

/*  ================= view ============== */
const messagesEl = document.getElementById("messages");

function sortByDate(a, b) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

function render() {
  const { messages, userStatus } = store.getState();
  messagesEl.innerHTML = messages
    .slice()
    .sort(sortByDate)
    .map((message) => `<div>${message.content}: ${message.postedBy}</div>`)
    .join("");

  document.forms.newMessage.fields.disabled = userStatus === "offline";
  document.forms.newMessage.message.value = "";
}

render();

/*  ================= handlers ============== */
document.addEventListener("submit", handle);
document.addEventListener("change", handle);

function handle(e) {
  const { target, type } = e;
  switch (type) {
    case "submit":
      if (target.name === "newMessage") {
        e.preventDefault();
        const content = target.message.value.trim();
        const postedBy = localStorage["preference"]
          ? JSON.parse(localStorage["preference"]).userName
          : "Jim";
        const date = new Date().toISOString();

        store.dispatch(messageCreated({ date, postedBy, content }));
      }
      break;
    case "change":
      if (target.name === "status") {
        store.dispatch(statusUpdated({ value: target.value }));
      }
      break;
  }
}
