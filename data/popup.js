import { Cal, selectData } from "./calendar.js";
import { renderCategories, addCategory } from "./categories.js";

const popupContainer = document.getElementById("popup-container");

const popupDataHTML = `
  <div id="popup-data" class="popup">
          <div class="popup-content">
            <button id="close-data-btn" class="popup-close">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <line x1="5.91341" y1="5.48009" x2="16.52" y2="16.0867"
                  stroke="#1E1E1E" stroke-width="2" />
                <line x1="6.26701" y1="16.0867" x2="16.8736" y2="5.48011"
                  stroke="#1E1E1E" stroke-width="2" />
              </svg>
            </button>
            <div class="calendar-wrapper">
              <div class="btns-data">
                <button class="data-today js-data-picker" data-picker-name="today">Today</button>
                <button class="data-tomorrow js-data-picker" data-picker-name="tomorrow">Tomorrow</button>
              </div>
              <div id="divCal"></div>
            </div>
          </div>
        </div>`;

const popupCategoryHTML = `
<div id="popup-category" class="popup">
          <div class="popup-content">
            <button id="close-category-btn" class="popup-close">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <line x1="5.91341" y1="5.48009" x2="16.52" y2="16.0867"
                  stroke="#1E1E1E" stroke-width="2" />
                <line x1="6.26701" y1="16.0867" x2="16.8736" y2="5.48011"
                  stroke="#1E1E1E" stroke-width="2" />
              </svg>
            </button>
            <div class="category">
              <div class="category-wrapper">
                <ul id="category-list"></ul>
              </div>
              <button class="create-inverse js-new-category" id="add-new-list-btn">+ Create new list</button>
            </div>
          </div>
        </div>`;

const popupNewListHTML = `
  <div id="popup-new-list" class="popup">
          <div class="popup-content">
            <button id="close-new-list-btn" class="popup-close">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <line x1="5.91341" y1="5.48009" x2="16.52" y2="16.0867"
                  stroke="#1E1E1E" stroke-width="2" />
                <line x1="6.26701" y1="16.0867" x2="16.8736" y2="5.48011"
                  stroke="#1E1E1E" stroke-width="2" />
              </svg>
            </button>
            <div class="new-list-wrapper">
              <input type="text" placeholder="write name of new list" class="new-category js-new-category" id="text-new-category">
              <div class="button-area"><button class="add-category-btn js-add-category" id="adding-new-category">Add</button></div>
              
            </div>
          </div>
        </div>`;

// ——— РЕНДЕР ПОПАПА ———

export function showPopup(html, closeBtnId) {
  popupContainer.innerHTML = html;

  console.log(html);
  document.getElementById(closeBtnId).addEventListener("click", () => {
    popupContainer.innerHTML = "";
  });
}

export function closePopup(namePopup) {
  popupContainer.innerHTML = "";
}

// ——— ПОДКЛЮЧЕНИЕ СОБЫТИЙ ———

export function activatePopups() {
  document.getElementById("data-btn").addEventListener("click", () => {
    showPopup(popupDataHTML, "close-data-btn");
    new Cal("divCal").showcurr();
    console.log("calendar");
    document.querySelectorAll(".js-data-picker").forEach((buttonPicker) => {
      buttonPicker.addEventListener("clicl", () => {
        const pickerName = buttonPicker.dataset.dataPickerName;
        selectData(pickerName);
      });
    });
  });

  document.getElementById("category-btn").addEventListener("click", () => {
    showPopup(popupCategoryHTML, "close-category-btn");
    renderCategories();
    document.querySelector(".js-new-category").addEventListener("click", () => {
      showPopup(popupNewListHTML, "close-new-list-btn");
    });
  });

  document.getElementById("add-new-list-btn").addEventListener("click", () => {
    showPopup(popupNewListHTML, "close-new-list-btn");
    document.querySelector(".js-add-category").addEventListener("click", () => {
      const category = document.querySelector(".js-new-category").value;
      addCategory(category);
    });
    const textInput = document.getElementById("text-new-category");
    const actionButton = document.getElementById("adding-new-category");

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
  });
}
