import { renderTodoList } from "../script.js";
import { todoList, saveToStorage } from "./todo.js";

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

export function markAsComplete(id) {
  const completedTask = todoList.find((task) => task.id === id);
  doneList.push(completedTask);

  // удаляем из активных задач
  const index = todoList.findIndex((task) => task.id === id);
  if (index !== -1) {
    todoList.splice(index, 1); // удаляем один элемент по индексу
  }

  saveDoneList();
  saveToStorage();

  // Перерисовываем список задач
  renderTodoList(todoList, doneList);
}
