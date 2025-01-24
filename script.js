let todoList = [
  { text: "walk with dog", category: "none", data: "today" },
  { text: "wash dishes", category: "none", data: "today" },
  { text: "make dinner", category: "none", data: "today" },
  { text: "write an essay", category: "none", data: "today" },
];

let doneList = [];

let categories = ["none", "Personal", "College", "Work", "House"];

let filteredCategory = "all"; // Текущая выбранная категория

function renderTodoList() {
  let todoListHTML = "";
  let doneListHTML = "";

  // Фильтруем задачи, если выбрана конкретная категория
  let filteredList = todoList;
  if (filteredCategory == "today") {
    filteredList =
      filteredCategory === "all"
        ? todoList
        : todoList.filter((task) => task.data === filteredCategory);
  } else {
    filteredList =
      filteredCategory === "all"
        ? todoList
        : todoList.filter((task) => task.category === filteredCategory);
  }

  console.log(filteredList);
  for (let i = 0; i < filteredList.length; i++) {
    const toDo = filteredList[i];
    const html = `
      <div class="todo-item">
        <div class="todo-left">
          <button class="mark-complete" onclick="markAsComplete(${i})">✔</button>
          <span class="todo-text" id="task-${toDo.text}">${toDo.text}</span>
        </div>
        <div class="todo-right">
          <span class="todo-data" id="data-${toDo.data}">${toDo.data}</span>
          <span class="todo-category">${toDo.category}</span>
        </div>
      </div>`;
    todoListHTML += html;
    console.log(toDo.data, toDo.category);
  }

  for (let i = 0; i < doneList.length; i++) {
    const done = doneList[i];
    const html = `
      <div class="todo-item done">
        <div class="todo-left">
          <button class="mark-complete" onclick="markAsComplete(${i})">✔</button>
          <span class="todo-text" id="task-${done.text}">${done.text}</span>
        </div>
        <div class="todo-right">
          <span class="todo-data">${done.data}</span>
          <span class="todo-category">${done.category}</span>
        </div>
      </div>`;
    doneListHTML += html;
  }

  document.querySelector(".task-list").innerHTML = todoListHTML;
  document.querySelector(".done-list").innerHTML = doneListHTML;
}

// Фильтровать задачи по категории

// Переменная для хранения текущей выбранной категории
let currentCategoryElement = null;

// Фильтровать задачи по категории
function filterTasks(category) {
  // Обновляем выбранную категорию
  filteredCategory = category;

  // Убираем класс у предыдущей выбранной категории
  if (currentCategoryElement) {
    currentCategoryElement.classList.remove("chosen");
  }

  // Находим текущую выбранную категорию и добавляем ей класс
  const chosenCategory = document.getElementById(`classificate-${category}`);
  if (chosenCategory) {
    chosenCategory.classList.add("chosen");
    currentCategoryElement = chosenCategory; // Сохраняем текущую категорию
  }

  // Перерисовываем список задач
  renderTodoList();
}

renderTodoList();

function addTodo() {
  const input_el = document.querySelector(".new-task");
  const selected_category = document.querySelector(".parameter-category");
  const selected_data = document.querySelector(".parameter-data");
  const text_task = input_el.value;
  const text_selected_category = selected_category.textContent;

  console.log(selected_category);

  const text_selected_data = selected_data.textContent;

  console.log(selected_data);

  todoList.push({
    text: text_task,
    category: text_selected_category,
    data: text_selected_data,
  });

  console.log(todoList);

  input_el.value = "";
  renderTodoList();
  saveTodoList(); // Сохраняем изменения
}

function openPopup(namePopup) {
  document.getElementById(namePopup).classList.add("open");
  if (namePopup == "popup-category") {
    renderCategories();
  }
}

function closePopup(namePopup) {
  document.getElementById(namePopup).classList.remove("open");
}

///          CALENDAR

var Cal = function (divId) {
  //Сохраняем идентификатор div
  this.divId = divId;
  // Дни недели с понедельника
  this.DaysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  // Месяцы начиная с января
  this.Months = [
    "January",
    "February",
    "March",
    "April",
    "Мay",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  //Устанавливаем текущий месяц, год
  var d = new Date();
  this.currMonth = d.getMonth();
  this.currYear = d.getFullYear();
  this.currDay = d.getDate();
};

// Функция для выделения выбранного дня
Cal.prototype.addDateSelection = function () {
  // Находим все элементы с классом "selectable"
  const days = document.querySelectorAll(".selectable");
  days.forEach((day) => {
    day.onclick = (e) => {
      // Убираем выделение с других элементов
      days.forEach((d) => d.classList.remove("selected"));
      // Добавляем класс выделения к текущему элементу
      day.classList.add("selected");

      // Получаем дату из атрибута data-date
      let selectedDate = e.target.getAttribute("data-date");
      console.log("Выбрана дата:", selectedDate);
      const selectedDateObj = new Date(selectedDate);
      const currentDate = new Date();
      if (
        selectedDateObj.getFullYear() === currentDate.getFullYear() &&
        selectedDateObj.getMonth() === currentDate.getMonth() &&
        selectedDateObj.getDate() === currentDate.getDate()
      ) {
        selectedDate = "today";
      }
      selectData(selectedDate);

      // Здесь вы можете выполнить дополнительные действия с выбранной датой
    };
  });
};

// Переход к следующему месяцу
Cal.prototype.nextMonth = function () {
  if (this.currMonth == 11) {
    this.currMonth = 0;
    this.currYear = this.currYear + 1;
  } else {
    this.currMonth = this.currMonth + 1;
  }
  this.showcurr();
};
// Переход к предыдущему месяцу
Cal.prototype.previousMonth = function () {
  if (this.currMonth == 0) {
    this.currMonth = 11;
    this.currYear = this.currYear - 1;
  } else {
    this.currMonth = this.currMonth - 1;
  }
  this.showcurr();
};
// Показать текущий месяц
Cal.prototype.showcurr = function () {
  this.showMonth(this.currYear, this.currMonth);
};
// Показать месяц (год, месяц)
Cal.prototype.showMonth = function (y, m) {
  var d = new Date(),
    // Первый день недели в выбранном месяце
    firstDayOfMonth = new Date(y, m, 7).getDay(),
    // Последний день выбранного месяца
    lastDateOfMonth = new Date(y, m + 1, 0).getDate(),
    // Последний день предыдущего месяца
    lastDayOfLastMonth =
      m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();
  var html = "<table>";
  // Запись выбранного месяца и года с кнопками
  html += "<thead><tr>";
  html += '<td><button id="btnPrev" class="btn-nav">&lt;</button></td>';
  html += '<td colspan="5">' + this.Months[m] + " " + y + "</td>";
  html += '<td><button id="btnNext" class="btn-nav">&gt;</button></td>';
  html += "</tr></thead>";
  // заголовок дней недели
  html += '<tr class="days">';
  for (var i = 0; i < this.DaysOfWeek.length; i++) {
    html += "<td>" + this.DaysOfWeek[i] + "</td>";
  }
  html += "</tr>";
  // Записываем дни
  var i = 1;
  do {
    var dow = new Date(y, m, i).getDay();
    // Начать новую строку в понедельник
    if (dow == 1) {
      html += "<tr>";
    }
    // Если первый день недели не понедельник показать последние дни предыдущего месяца
    else if (i == 1) {
      html += "<tr>";
      var k = lastDayOfLastMonth - firstDayOfMonth + 1;
      for (var j = 0; j < firstDayOfMonth; j++) {
        html += '<td class="not-current">' + k + "</td>";
        k++;
      }
    }
    // Записываем текущий день в цикл
    var chk = new Date();
    var chkY = chk.getFullYear();
    var chkM = chk.getMonth();
    if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
      html += `<td class="today selectable" data-date="${y}-${
        m + 1
      }-${i}">${i}</td>`;
    } else {
      html += `<td class="normal selectable" data-date="${y}-${
        m + 1
      }-${i}">${i}</td>`;
    }
    // закрыть строку в воскресенье
    if (dow == 0) {
      html += "</tr>";
    }
    // Если последний день месяца не воскресенье, показать первые дни следующего месяца
    else if (i == lastDateOfMonth) {
      var k = 1;
      for (dow; dow < 7; dow++) {
        html += '<td class="not-current">' + k + "</td>";
        k++;
      }
    }
    i++;
  } while (i <= lastDateOfMonth);
  // Конец таблицы
  html += "</table>";
  // Записываем HTML в div
  document.getElementById(this.divId).innerHTML = html;

  // Привязываем события к кнопкам снова, так как они пересоздаются
  document.getElementById("btnNext").onclick = () => this.nextMonth();
  document.getElementById("btnPrev").onclick = () => this.previousMonth();

  // Привязываем события для выбора даты
  this.addDateSelection();
};

// При загрузке окна
window.onload = function () {
  loadTodoList(); // Загружаем данные из localStorage
  renderTodoList(); // Отображаем список задач
  // Начать календарь
  var c = new Cal("divCal");
  c.showcurr();
};
// Получить элемент по id
function getId(id) {
  return document.getElementById(id);
}

///

// Находим элементы в DOM
const categoryButton = document.getElementById("category-btn");
const dataButton = document.getElementById("data-btn");
const categoryList = document.getElementById("category-list");

// Функция для создания списка категорий
const renderCategories = () => {
  // Очищаем список (на случай повторного вызова)
  categoryList.innerHTML = "";

  // Создаем элементы списка для каждой категории
  categories.forEach((category) => {
    const li = document.createElement("li");
    li.textContent = category;
    li.addEventListener("click", () => selectCategory(category));
    categoryList.appendChild(li);
  });
};

// Функция для выбора категории
const selectCategory = (category) => {
  categoryButton.textContent = category; // Устанавливаем текст кнопки
  closePopup("popup-category"); // Закрываем попап
};

// Функция для выбора даты
const selectData = (data) => {
  dataButton.textContent = data; // Устанавливаем текст кнопки
  closePopup("popup-data"); // Закрываем попап
};

// Рендерим категории при загрузке
renderCategories();

function saveTodoList() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
  localStorage.setItem("doneList", JSON.stringify(doneList));
}

function loadTodoList() {
  const savedList = localStorage.getItem("todoList");
  if (savedList) {
    todoList = JSON.parse(savedList);
  }
  const doneSavedList = localStorage.getItem("doneList");
  if (doneSavedList) {
    doneList = JSON.parse(doneSavedList);
  }
}

// Получаем элементы
const textInput = document.getElementById("text-new-category");
const actionButton = document.getElementById("adding-new-category");

function addCategory() {
  categories.push(textInput);
  renderCategories();
}

// Добавляем обработчик события input
textInput.addEventListener("input", () => {
  if (textInput.value.trim() !== "") {
    // Если текст введен, активируем кнопку и меняем текст
    actionButton.disabled = false;
    actionButton.classList.add("active");
  } else {
    // Если поле пустое, отключаем кнопку и сбрасываем текст
    actionButton.disabled = true;
    actionButton.classList.remove("active");
  }
});

// Находим элементы в DOM
const categoryListForClassification = document.getElementById(
  "category-list-for-classification"
);

// Функция для создания списка категорий
const renderCategoriesForClassification = () => {
  // Очищаем список (на случай повторного вызова)
  categoryListForClassification.innerHTML = "";

  // Создаем элементы списка для каждой категории
  categories.forEach((category) => {
    const li = document.createElement("li");
    li.textContent = category;
    // Задаем уникальный id
    li.id = `classificate-${category}`; // Можно использовать `category-${index}` для числового id
    li.className = "classification-category";
    li.addEventListener("click", () => filterTasks(category));
    categoryListForClassification.appendChild(li);
  });
};

renderCategoriesForClassification();

function markAsComplete(index) {
  // Помечаем задачу как выполненную
  const completedTask = todoList[index];
  todoList.splice(index, 1);

  doneList.push(completedTask);
  saveTodoList();

  // Перерисовываем список задач
  renderTodoList();
}

DaysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

var d = new Date();

const tempDay = document.getElementById("day-main");

tempDay.textContent = this.DaysOfWeek[d.getDay() - 1];

const tempData = document.getElementById("data-main");
tempData.textContent = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
