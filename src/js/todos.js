import { Dispatcher, ReduceStore } from "./flux";
import { generate as id } from "shortid";
import { tasks } from "./data";

// ================ actions =================
const CREATE_TODO = "CREATE_TODO";
const COMPLETE_TODO = "COMPLETE_TODO";
const SHOW_TODO_COMPLETED = "SHOW_TODO_COMPLETED";

const createTodoAction = (content) => ({
  type: CREATE_TODO,
  payload: { content },
});

const completeTodoAction = (id, completed) => ({
  type: COMPLETE_TODO,
  payload: { id, completed },
});

const showTodoCompletedAction = (show) => ({
  type: SHOW_TODO_COMPLETED,
  payload: { show },
});

// ================ store  ==================

class TodoReducerStore extends ReduceStore {
  getInitialState() {
    console.log("TodoReducerStore -> getInitialState -> getInitialState");

    return {
      tasks,
      showCompleted: true,
    };
  }
  reducer(state, action) {
    console.log("TodoReducerStore -> reducer -> reducer", action);
    const { type, payload } = action;
    let newState;
    switch (type) {
      case CREATE_TODO:
        newState = { ...state, tasks: [...state.tasks] };
        newState.tasks.push({
          id: id(),
          content: payload.content,
          completed: false,
        });
        return newState;

      case COMPLETE_TODO:
        newState = { ...state, tasks: [...state.tasks] };
        const idx = newState.tasks.findIndex((t) => t.id === payload.id);
        newState.tasks[idx] = {
          ...state.tasks[idx],
          completed: payload.completed,
        };
        return newState;

      case SHOW_TODO_COMPLETED:
        return { ...state, showCompleted: payload.show };

      default:
        return state;
    }
  }
}

const todoDispatcher = new Dispatcher();
const todoStore = new TodoReducerStore(todoDispatcher);
window.store = todoStore;

console.log(todoStore.getState());
// ================ view ====================

const tasksSection = document.getElementById("tasks");
const historyLengthBrn = document.getElementById("history-length");

function TaskComponent({ id, content, completed }) {
  return `<section>
        <label for="todo-${id}">${content}</label>
        <input id="todo-${id}" name="todoCheck" type="checkbox"
            data-id="${id}" ${completed ? "checked" : ""}
        />
    </section>`;
}

function render({ showCompleted, tasks }) {
  console.log("RENDER", showCompleted, tasks);
  console.log(
    "tasks",
    tasks.filter((t, index) => {
      console.log("filter index=", index);
      return showCompleted ? true : !t.completed;
    })
  );
  tasksSection.innerHTML = tasks
    .filter((t) => (showCompleted ? true : !t.completed))
    .map(TaskComponent)
    .join("");
}

function renderHistoryButton() {
  console.log("history", todoStore.hasHistory);
  historyLengthBrn.textContent = todoStore.hasHistory
    ? ` - ${todoStore.history.length}`
    : "";

  historyLengthBrn.parentNode.disabled = !todoStore.hasHistory;
}

render(todoStore.getState());
renderHistoryButton();
todoStore.subscribe(render);
todoStore.subscribe(renderHistoryButton);

// ================ handlers ================

document.addEventListener("submit", handle);
document.addEventListener("change", handle);
document.addEventListener("click", handle);

function handle({ target, type }) {
  switch (type) {
    case "submit":
      if (target.name !== "newTask") {
        return;
      }
      event.preventDefault();
      const content = target.newTaskName.value.trim();
      if (content) {
        todoDispatcher.dispatch(createTodoAction(content));
        target.newTaskName.value = "";
      }
      break;
    case "change":
      if (target.name === "todoCheck") {
        const id = target.dataset.id;
        todoDispatcher.dispatch(completeTodoAction(id, target.checked));
      } else if (target.name === "showCompleted") {
        const show = target.checked;
        todoDispatcher.dispatch(showTodoCompletedAction(show));
      }
      break;
    case "click":
      if (target.id === "undo") {
        todoStore.revartLastHistory();
      }
      break;
  }
}
