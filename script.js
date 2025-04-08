import { addTodoList, todoList, loadTodoFromStorage } from "./data/todo.js";
import { doneList, markAsComplete, loadDoneFromStorage } from "./data/done.js";
import {
  loadCategoriesFromStorage,
  renderCategoriesForClassification,
  getCategory,
  categories,
} from "./data/categories.js";
import { activatePopups } from "./data/popup.js";
import { updateTime } from "./utils/utils.js";

export function renderTodoList(todolist, donelist) {
  let todoListHTML = "";
  let doneListHTML = "";
  // Получаем сегодняшнюю дату
  const today = new Date().toISOString().split("T")[0]; // Формат: "YYYY-MM-DD"
  console.log(today);

  for (let i = 0; i < todolist.length; i++) {
    const toDo = todolist[i];
    // Если дата задачи совпадает с сегодняшней, заменяем её на 'today'
    const displayDate = toDo.data === today ? "today" : toDo.data;
    console.log(toDo.categoryId);
    const category = getCategory(toDo.categoryId);
    console.log(category);

    const html = `
      <div class="todo-item">
        <div class="todo-left">
          <button class="mark-complete js-mark-complete" data-button-mark-complete-id="${toDo.id}">✔</button>
          <span class="todo-text" id="task-${toDo.text}">${toDo.text}</span>
        </div>
        <div class="todo-right">
          <span class="todo-data" id="data-${displayDate}">${displayDate}</span>
          <span class="todo-category">${category.name}</span>
        </div>
      </div>`;
    todoListHTML += html;
    //console.log(toDo.data, toDo.category);
  }

  if (donelist.length > 0) {
    for (let i = 0; i < donelist.length; i++) {
      const done = donelist[i];
      if (!done) continue; // Пропускаем, если элемент невалидный

      const displayDate = done.data === today ? "today" : done.data;
      const category = getCategory(done.categoryId);
      const html = `
        <div class="todo-item done">
          <div class="todo-left">
            <button class="mark-complete js-mark-complete" data-button-mark-complete-id="${done.id}">✔</button>
            <span class="todo-text" id="task-${done.text}">${done.text}</span>
          </div>
          <div class="todo-right">
            <span class="todo-data">${displayDate}</span>
            <span class="todo-category">${category.name}</span>
          </div>
        </div>`;
      doneListHTML += html;
    }
  } else {
    doneListHTML = ``;
  }

  document.querySelector(".task-list").innerHTML = todoListHTML;
  document.querySelector(".done-list").innerHTML = doneListHTML;

  document.querySelectorAll(".js-mark-complete").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.buttonMarkCompleteId;
      markAsComplete(id);
    });
  });
}

document.querySelector(".js-add-task").addEventListener("click", () => {
  addTodoList();
});

document.querySelectorAll(".js-filter-task").forEach((li) => {
  li.addEventListener("click", filterTasks);
});

function init() {
  loadCategoriesFromStorage();
  renderCategoriesForClassification();
  loadTodoFromStorage();
  loadDoneFromStorage();
  updateTime();
  activatePopups();
  renderTodoList(todoList, doneList);
}

window.addEventListener("DOMContentLoaded", init);
