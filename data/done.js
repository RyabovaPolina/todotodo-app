import { renderTodoList } from "../script.js";
import { todoList } from "./todo.js";

export let doneList = [];
loadDoneFromStorage();

export function loadDoneFromStorage() {
  const saved = JSON.parse(localStorage.getItem("doneList")) || [];

  // Мутируем массив, а не перезаписываем его
  doneList.length = 0; // Очищаем текущий массив
  doneList.push(...saved); // Заполняем новый массив
}

function saveDoneList() {
  localStorage.setItem("doneList", JSON.stringify(doneList));
}

export function markAsComplete(index) {
  // Помечаем задачу как выполненную
  const completedTask = todoList[index];
  todoList.splice(index, 1);

  doneList.push(completedTask);
  saveDoneList();

  // Перерисовываем список задач
  renderTodoList(todoList);
}
