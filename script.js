let todoList = [
  { text: "walk with dog", category: "none", data: "today" },
  { text: "wash dishes", category: "none", data: "today" },
  { text: "make dinner", category: "none", data: "today" },
  { text: "write an essay", category: "none", data: "today" },
];

let categories = ["None", "Personal", "College", "Work", "House"];

renderTodoList();

function renderTodoList() {
  let todoListHTML = "";

  for (let i = 0; i < todoList.length; i++) {
    const toDo = todoList[i];
    const html = `
      <div class="todo-item">
        <div class="todo-left">
          <button class="mark-complete" onclick="markAsComplete(${i})">✔</button>
          <span class="todo-text">${toDo.text}</span>
        </div>
        <div class="todo-right">
          <span class="todo-data">${toDo.data}</span>
          <span class="todo-category">${toDo.category}</span>
        </div>
      </div>`;
    todoListHTML += html;
    console.log(toDo.data, toDo.category);
  }

  document.querySelector(".task-list").innerHTML = todoListHTML;
}

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
      e.target.classList.add("selected");

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
}

function loadTodoList() {
  const savedList = localStorage.getItem("todoList");
  if (savedList) {
    todoList = JSON.parse(savedList);
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
    li.addEventListener("click", () =>
      selectCategoryForClassification(category)
    );
    categoryListForClassification.appendChild(li);
  });
};

renderCategoriesForClassification();

// Функция для выбора категории
const selectCategoryForClassification = (category) => {};
