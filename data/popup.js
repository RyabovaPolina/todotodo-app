import { categoriesStore } from "./categories.js";

const popupContainer = document.getElementById("popup-container");

function identifyPopup(type) {
  const templates = {
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

export function showPopup(html, closeBtnId) {
  popupContainer.innerHTML = html;

  document.getElementById(closeBtnId).addEventListener("click", () => {
    popupContainer.innerHTML = "";
  });
}

export function closePopup() {
  popupContainer.innerHTML = "";
}


export function openAlertPopup() {
  showPopup(identifyPopup("alert"), "close-alert-btn");
}
export function openNewListPopup(onCategoryAdded) {
  showPopup(identifyPopup("newList"), "close-newList-btn");
  
  const input = popupContainer.querySelector("#text-new-category");
  const addBtn = popupContainer.querySelector("#adding-new-category");
  
  if (!input || !addBtn) return;
  
  addBtn.disabled = true;
  
  input.addEventListener('input', () => {
    addBtn.disabled = !input.value.trim();
  });
  
  addBtn.addEventListener('click', () => {
    const categoryName = input.value.trim();
    if (categoryName) {
      categoriesStore.addCategorie({ title: categoryName });
      
      if (onCategoryAdded) {
        onCategoryAdded();
      }
      
      closePopup();
    }
  });
  
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && input.value.trim()) {
      addBtn.click();
    }
  });
  
  input.focus();
}