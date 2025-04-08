import { closePopup } from "./popup.js";

///          CALENDAR

export var Cal = function (divId) {
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
      //console.log("Выбрана дата:", selectedDate);
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

// Функция для выбора даты
export function selectData(data) {
  const dataButton = document.getElementById("data-btn");
  dataButton.textContent = data; // Устанавливаем текст кнопки
  closePopup("popup-data"); // Закрываем попап
}

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
