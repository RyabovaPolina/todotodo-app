import { getCategory, categories } from "./categories.js";
import { renderTodoList } from "../script.js";
import { generateId } from "../utils/utils.js";
import { doneList } from "./done.js";

export let todoList = [];
loadTodoFromStorage();

export function addTodoList() {
  const input_el = document.querySelector(".new-task");
  const selected_category = document.querySelector(".parameter-category");
  const selected_data = document.querySelector(".parameter-data");
  const text_task = input_el.value;
  const selected_category_name = selected_category.textContent;
  console.log(selected_category_name);

  const category = categories.find(
    (category) => category.name === selected_category_name
  );

  console.log(category);

  const text_selected_data = selected_data.textContent;

  const newId = generateId();

  todoList.push({
    id: newId,
    text: text_task,
    categoryId: category.id,
    data: text_selected_data,
  });

  input_el.value = "";
  saveToStorage();
  renderTodoList(todoList, doneList);
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

  //console.log(saved);

  // Мутируем массив, а не перезаписываем его
  todoList.length = 0; // Очищаем текущий массив
  todoList.push(...saved); // Заполняем новый массив

  //console.log(todoList);
}

export function saveToStorage() {
  localStorage.setItem("todo", JSON.stringify(todoList));
}
