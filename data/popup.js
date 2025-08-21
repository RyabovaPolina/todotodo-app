import { Cal, selectData } from "./calendar.js";
import { renderCategories, addCategory } from "./categories.js";

const popupContainer = document.getElementById("popup-container");

function identifyPopup(type) {
  const templates = {
    calendar: `
      <div class="calendar-wrapper">
        <div id="divCal"></div>
      </div>
    `,
    category: `
      <div class="category">
        <div class="category-wrapper">
          <ul id="category-list"></ul>
        </div>
        <button class="create-inverse js-new-category-btn" id="add-new-list-btn">
          + Create new list
        </button>
      </div>
    `,
    newList: `
      <div class="new-list-wrapper">
        <input type="text" placeholder="write name of new list" class="new-category js-new-category" id="text-new-category">
        <div class="button-area">
          <button class="add-category-btn js-add-category" id="adding-new-category">Add</button>
        </div> 
      </div>
    `,
    alert: `<div style="color:black; padding: 20px; line-height: 1.25rem">Для создания задачи необходимо заполнить все поля-атрибуты: текст, категория, дата.</div>`,
    default: `<div>Unknown popup type</div>`,
  };

  const content = templates[type] || templates.default;

  return `
    <div id="popup-data" class="popup">
      <div class="popup-content">
        <button id="close-${type}-btn" class="popup-close">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="5.91341" y1="5.48009" x2="16.52" y2="16.0867" stroke="#1E1E1E" stroke-width="2" />
            <line x1="6.26701" y1="16.0867" x2="16.8736" y2="5.48011" stroke="#1E1E1E" stroke-width="2" />
          </svg>
        </button>
        ${content}
      </div>
    </div>
  `;
}

// ——— РЕНДЕР ПОПАПА ———

export function showPopup(html, closeBtnId) {
  popupContainer.innerHTML = html;

  document.getElementById(closeBtnId).addEventListener("click", () => {
    popupContainer.innerHTML = "";
  });
}

export function closePopup(namePopup) {
  popupContainer.innerHTML = "";
}

// ——— ПОДКЛЮЧЕНИЕ СОБЫТИЙ ———

export function activatePopups() {
  // 1) Находим кнопки, которые существуют на странице изначально
  const dataBtn = document.getElementById("data-btn");
  const categoryBtn = document.getElementById("category-btn");
  const newListBtn = document.getElementById("add-new-list-btn");

  // 2) Открыть календарь
  if (dataBtn) {
    dataBtn.addEventListener("click", () => {
      // важно: id для кнопки закрытия соответствует шаблону close-${type}-btn => close-calendar-btn
      showPopup(identifyPopup("calendar"), "close-calendar-btn");
      new Cal("divCal").showcurr(); // инициализация календаря
    });
  }

  // 3) Открыть список категорий
  if (categoryBtn) {
    categoryBtn.addEventListener("click", () => {
      // важно: корректный id кнопки закрытия
      showPopup(identifyPopup("category"), "close-category-btn");
      renderCategories(); // отрисовать категории внутри попапа
      // дальше обработчики не навешиваем — их поймает делегирование на popupContainer
    });
  }

  // 4) Делегирование кликов внутри попапа
  popupContainer.addEventListener("click", (e) => {
    // 4.1) Закрыть попап по клику на крестик
    const closeBtn = e.target.closest(".popup-close");
    if (closeBtn) {
      closePopup();
      return;
    }

    // 4.2) Клик по кнопке “+ Create new list” внутри попапа категорий
    const newListBtn = e.target.closest(".js-new-category-btn");
    if (newListBtn) {
      openNewListPopup();
      return;
    }

    // 4.3) Клик по кнопке "Add" в попапе создания новой категории
    const addBtn = e.target.closest(".js-add-category");
    if (addBtn) {
      const input = popupContainer.querySelector(".js-new-category");
      const value = (input?.value || "").trim();
      if (!value) return; // защита от пустых значений
      addCategory(value);
      // после добавления возвращаемся к списку категорий и перерисовываем его
      showPopup(identifyPopup("category"), "close-category-btn");
      renderCategories();
      return;
    }
  });

  // 5) Делегирование ввода (активация/деактивация кнопки Add)
  popupContainer.addEventListener("input", (e) => {
    // следим именно за полем ввода новой категории
    if (e.target.matches("#text-new-category")) {
      const addBtn = popupContainer.querySelector("#adding-new-category");
      const isFilled = !!e.target.value.trim();
      if (addBtn) {
        addBtn.disabled = !isFilled;
        addBtn.classList.toggle("active", isFilled);
      }
    }
  });
}

// 2. Прямой обработчик для кнопки "+ Create new list"
const newListBtn = document.getElementById("add-new-list-btn");

if (newListBtn) {
  newListBtn.addEventListener("click", () => {
    openNewListPopup();
  });
}

export function openAlertPopup() {
  showPopup(identifyPopup("alert"), "close-alert-btn");
}

function openNewListPopup() {
  // открыть попап создания новой категории
  showPopup(identifyPopup("newList"), "close-newList-btn");
  // инициализировать состояние кнопки Add (выкл, пока поле пустое)
  const input = popupContainer.querySelector("#text-new-category");
  const addBtn = popupContainer.querySelector("#adding-new-category");
  if (addBtn) addBtn.disabled = !input?.value.trim();
}
