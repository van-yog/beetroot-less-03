const state = {
  showCompleted: true,
  tasks: [{ id: 1 }, { id: 2 }],
};

// создаем копию объекта деструктуризацией + добавляем повторно поле.
// объект два одинаковых поля удалит ( оптимизирует ) и это будет копия объекта
const newState = { ...state, tasks: [...state.tasks] };
console.log("NewState", newState.tasks);
console.log(state.tasks === newState.tasks);

newState.tasks.push({ id: 333 });
console.log("state", state.tasks);
console.log("NewState", newState.tasks);
