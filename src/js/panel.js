import { Dispatcher, Store } from "./flux";
import { panelData } from "./data";

/*  =========== actions ===  */
const CHANGE_USERNAME = "CHANGE_USERNAME";
const CHANGE_FONTSIZE = "CHANGE_FONTSIZE";

const userNameUpdateAction = (userName) => ({
  type: CHANGE_USERNAME,
  payload: { userName },
});
const changeFontSizeAction = (fontSize) => ({
  type: CHANGE_FONTSIZE,
  payload: { fontSize },
});

/*  =========== store ===  */
class PanelStore extends Store {
  getInitialState() {
    let initState = localStorage["preference"]
      ? JSON.parse(localStorage["preference"])
      : panelData;
    console.log("PanelStore -> getInitialState -> getInitialState", initState);

    return initState;
  }
  onDispatch(action) {
    const { type, payload } = action;
    console.log("PanelStore -> onDispatch -> action :", type, payload);

    switch (type) {
      case CHANGE_USERNAME:
        this.state.userName = payload.userName;
        break;
      case CHANGE_FONTSIZE:
        this.state.fontSize = payload.fontSize;
    }

    this.emitChange();
  }
}

/*  =========== view ===  */
const userNameEl = document.getElementById("userName");
const contentPageEl = document.getElementById("content-page");
const fontSizeEl = document.forms.fontSizeForm.fontSize;

function render({ userName, fontSize }) {
  console.log("render -> fontSize", fontSize);
  console.log("render -> userName", userName);

  userNameEl.innerHTML = userName;
  contentPageEl.style.fontSize = fontSize === "small" ? "16px" : "22px";
  fontSizeEl.value = fontSize;
  localStorage["preference"] = JSON.stringify({ userName, fontSize });
}

const panelDispatcher = new Dispatcher();
const panelStore = new PanelStore(panelDispatcher);
render(panelStore.getState());
panelStore.subscribe(render);
window.store = panelStore;
window.render = render;

/*  =========== handlers ===  */

document.addEventListener("input", handleChangeName);
document.addEventListener("change", handleChangeName);

function handleChangeName({ target, type }) {
  switch (type) {
    case "input":
      if (target.id !== "userNameInput") {
        return;
      }
      const userName = target.value.trim();
      panelDispatcher.dispatch(userNameUpdateAction(userName));
      break;
    case "change":
      if (target.name !== "fontSize") {
        return;
      }
      const fontSize = target.value;
      panelDispatcher.dispatch(changeFontSizeAction(fontSize));
      break;
  }
}

// panelDispatcher.register(console.log);
// panelDispatcher.register(console.table);
