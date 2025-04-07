import { renderTodoList } from "./script.js";
import { closePopup } from "./popup.js";
import { todoList } from "./data/todo.js";
import { filterTasks, generateId } from "./utils.js";

export let categories = [];

loadCategoriesFromStorage();

export function addCategory() {
  const textInput = document.getElementById("text-new-category").value;
  categories.push({
    id: generateId(),
    name: textInput,
  });
  //console.log(categories);
  renderCategoriesForClassification();
  saveToStorage();
  closePopup("popup-new-list"); // Закрываем попап
}

// Функция для создания списка категорий
export function renderCategories() {
  const categoryList = document.getElementById("category-list");
  categoryList.innerHTML = "";
  categories.forEach((category) => {
    const li = document.createElement("li");
    li.textContent = category.name;
    li.addEventListener("click", () => selectCategory(category));
    li.dataset.categoryId = category.id;
    categoryList.appendChild(li);
  });
}

export function getCategory(categoryId) {
  let categoryCurrent;
  categories.forEach((category) => {
    if (category.id === categoryId) {
      categoryCurrent = category;
    }
  });
  return categoryCurrent || categories[3];
}

// Функция для выбора категории
function selectCategory(category) {
  // Находим элементы в DOM
  const categoryButton = document.getElementById("category-btn");
  categoryButton.textContent = category.name; // Устанавливаем текст кнопки
  closePopup("popup-category"); // Закрываем попап
}

// Функция для создания списка категорий
export function renderCategoriesForClassification() {
  // Находим элементы в DOM
  const categoryListForClassification = document.getElementById(
    "category-list-for-classification"
  );
  // Очищаем список (на случай повторного вызова)
  categoryListForClassification.innerHTML = "";

  // Создаем элементы списка для каждой категории
  categories.forEach((category) => {
    const li = document.createElement("li");
    li.textContent = category.name;
    // Задаем уникальный id
    li.id = `classificate-${category.id}`; // Можно использовать `category-${index}` для числового id
    li.className = "classification-category";
    li.addEventListener("click", () => {
      let newList = filterTasks(category.id, todoList);
      console.log(newList);
      renderTodoList(newList);
    });
    categoryListForClassification.appendChild(li);
  });
}

function saveToStorage() {
  localStorage.setItem("categories", JSON.stringify(categories));
}

export function loadCategoriesFromStorage() {
  const saved = JSON.parse(localStorage.getItem("categories"));

  if (saved) {
    categories = saved;
  } else {
    // если в старом формате (строки), преобразуем в объекты с id

    categories = [
      {
        id: "712139128912232",
        name: "Personal",
      },
      {
        id: "32139128912232",
        name: "today",
      },
      {
        id: "5223128912232",
        name: "All",
      },
      {
        id: "122138791242",
        name: "none",
      },
      {
        id: "32232331122",
        name: "College",
      },
      {
        id: "212142556122",
        name: "Work",
      },
      {
        id: "322123143233122",
        name: "House",
      },
    ];
    saveToStorage(); // сохраним в новом формате
  }
}
