import { categories } from "../data/categories.js";

let currentCategoryElement = null;

// Фильтровать задачи по категории
export function filterTasks(categoryId, todolist) {
  // Убираем класс у предыдущей выбранной категории
  if (currentCategoryElement) {
    currentCategoryElement.classList.remove("chosen");
  }

  // Находим текущую выбранную категорию и добавляем ей класс
  const chosenCategory = document.getElementById(`classificate-${categoryId}`);
  if (chosenCategory) {
    chosenCategory.classList.add("chosen");
    currentCategoryElement = chosenCategory;
  }

  // Если выбрана категория "All" — показать все
  const categoryObj = categories.find((category) => category.id === categoryId);
  if (categoryObj.name === "All") {
    return todolist;
  }

  // Если выбрана категория "today", фильтруем задачи, дата которых совпадает с сегодняшней
  if (categoryObj.name === "today") {
    const today = new Date().toISOString().split("T")[0]; // Получаем сегодняшнюю дату в формате YYYY-MM-DD
    return todolist.filter((task) => task.data === today); // Фильтруем по дате
  }

  // Фильтруем по id категории
  return todolist.filter((task) => task.categoryId === categoryId);
}

export function generateId() {
  return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export function updateTime() {
  const today = new Date();
  const dayOfWeek = today.getDay(); // Получаем день недели (0 — воскресенье, 1 — понедельник, ...)
  const dataDay = today.getDate();
  const dataMonth = today.getMonth();
  const dataYear = today.getFullYear();

  // Массив с названиями дней недели
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dayName = daysOfWeek[dayOfWeek];

  document.getElementById("day-main").innerHTML = dayName;
  document.getElementById(
    "data-main"
  ).innerHTML = `${dataDay}/${dataMonth}/${dataYear}`;
}
