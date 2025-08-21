import { getCategory, categories } from "./categories.js";
import { renderTodoList } from "../script.js";
import { generateId } from "../utils/utils.js";
import { doneList } from "./done.js";
import { openAlertPopup } from "./popup.js";

export let todoList = [];
loadTodoFromStorage();

export function addTodoList() {
  const text_task = document.querySelector(".new-task").value;
  const selected_category_name = document.querySelector(
    ".parameter-category"
  ).textContent;
  const category = categories.find(
    (category) => category.name === selected_category_name
  );
  const text_selected_data =
    document.querySelector(".parameter-data").textContent;
  const newId = generateId();

  if (text_task && category && text_selected_data) {
    todoList.push({
      id: newId,
      text: text_task,
      categoryId: category.id,
      data: text_selected_data,
    });

    input_el.value = "";
    saveToStorage();
    renderTodoList(todoList, doneList);
  } else {
    openAlertPopup();
  }
}

export function loadTodoFromStorage() {
  const saved = JSON.parse(localStorage.getItem("todo")) || [
    {
      id: "546737139128912",
      text: "walk with dog",
      categoryId: "122138791242",
      data: "2025-04-08",
    },
    {
      id: "541212128912",
      text: "wash dishes",
      categoryId: "712139128912232",
      data: "2025-04-08",
    },
    {
      id: "5412314245912",
      text: "make dinner",
      categoryId: "122138791242",
      data: "2025-04-08",
    },
    {
      id: "54647139124522",
      text: "write an essay",
      categoryId: "322123143233122",
      data: "2025-04-07",
    },
  ];

  // Мутируем массив, а не перезаписываем его
  todoList.length = 0; // Очищаем текущий массив
  todoList.push(...saved); // Заполняем новый массив

  //console.log(todoList);
}

export function saveToStorage() {
  localStorage.setItem("todo", JSON.stringify(todoList));
}
