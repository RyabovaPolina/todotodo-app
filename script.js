import { updateTime } from "./utils/utils.js"
import { store } from "./todo-store.js"
import { categoriesStore } from "./categories-store.js";
import { openNewListPopup, openAlertPopup } from "./popups.js";

function renderTodolist(){
    let todoListHTML = "";

    store.filteredTodos.forEach(todo=>{
        const category = categoriesStore.categories.find(cat => cat.id === todo.categoryId);
        const categoryTitle = category ? category.title : 'unknown';

        const html = `
            <div class='todo-item ${todo.completed && `done`}' data-id="${todo.id}">
                <div class="todo-left">
                    <button class="mark-complete js-mark-complete" data-todo-id="${todo.id}">✔</button>
                    <span class="todo-text" id="task-${todo.title}">${todo.title}</span>
                </div>
                <div class="todo-right">
                    <span class="todo-data" id="data-${todo.data}">${todo.data}</span>
                    <span class="todo-category">${categoryTitle}</span>
                    <button class="delete-btn js-delete-todo" data-todo-id="${todo.id}">delete</button>
                </div>
            </div>`;
        todoListHTML += html;
    })

  document.querySelector(".task-list").innerHTML = todoListHTML;
}


function renderCategories() {
    const categoryList = document.getElementById("select-category");
    if (!categoryList) return;

    categoryList.innerHTML = `<option value="">category</option>`;

    categoriesStore.categories.forEach((category) => {
        const option = document.createElement("option");
        option.textContent = category.title
        option.value = category.title
        option.datasetCategoryId = category.id

        categoryList.appendChild(option);
    });
}

function renderCategoriesList() {
    const categoryList = document.getElementById("category-list-for-classification");
    if (!categoryList) return;
    
    categoryList.innerHTML = "";
    
    const filterItems = [
        { type: 'all', id: 'all', title: 'All' }
    ];
    
    categoriesStore.categories.forEach(category => {
        filterItems.push({
            type: 'category',
            id: category.id,
            title: category.title
        });
    });
    
    filterItems.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.title;
        li.classList.add('classification-category');
        
        if (item.type === 'all') {
            li.dataset.categoryId = 'all';
            li.innerHTML = `
                <span class="category-title">${item.title}</span>
            `;
        } else {
            li.dataset.categoryId = item.id;
            li.innerHTML = `
                <span class="category-title">${item.title}</span>
                <button class="delete-category-btn js-delete-category" data-category-id="${item.id}" title="Delete category">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                        <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" stroke-width="2"/>
                    </svg>
                </button>
            `;
        }
        
        const isActive = (item.type === 'all' && store.currentFilter === 'all') || 
                        (item.type === 'category' && store.currentFilter === item.id);
        
        if (isActive) {
            li.classList.add('chosen');
        }
        
        categoryList.appendChild(li);
    });
}

function handleFilterClick(clickedElement) {
    document.querySelectorAll('.classification-category.chosen').forEach(element => {
        element.classList.remove('chosen');
    });
    
    clickedElement.classList.add('chosen');
    
    const filterType = clickedElement.dataset.categoryId;
    store.setFilter(filterType);
    renderTodolist();
}

function addTodoList() {
  const text_task = document.querySelector(".new-task").value;
  const category = categoriesStore.categories.find(
    (category) => category.title === document.getElementById("select-category").value
  );
  const text_selected_data =
    document.querySelector(".datepicker-input").value;

  if (text_task && category && text_selected_data) {
    const newTodo ={
      title: text_task,
      categoryId: category.id,
      data: text_selected_data,
      completed: false
    };

    store.addTodo(newTodo)

    document.querySelector(".new-task").value = "";
    document.getElementById("select-category").value = "";
    document.getElementById("dateInput").value = "";
    renderTodolist();
  } else {
    console.error("Missing required fields:", {
        text_task: !!text_task,
        category: !!category,
        text_selected_data: !!text_selected_data
    });
    openAlertPopup();
  }
}

function markAsComplete(id) {
  store.updateTodo(id, {completed:true})
  renderTodolist();
}

function deleteTodo(id) {
  store.removeTodo(id)
  renderTodolist();
}

function deleteCategory(id) {
    if (id === 'all') {
        alert('Cannot delete "All" category');
        return;
    }

    categoriesStore.removeCategorie(id);
    
    if (store.filter === id) {
        store.setFilter('all');
    }
    
    renderCategories();
    renderCategoriesList();
    renderTodolist();
    
}



document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.querySelector(".js-add-task");
    
    if (addButton) {
        addButton.addEventListener("click", addTodoList);
    } else {
        console.error("Add button not found!");
    }

    const newListBtn = document.getElementById("add-new-list-btn");

    if (newListBtn) {
    newListBtn.addEventListener("click", () => {
        openNewListPopup(() => {
        //  колбэк вызовется только ПОСЛЕ добавления категории
        renderCategories();
        renderCategoriesList();
        });
    });
    }

    // enter
    const taskInput = document.querySelector(".new-task");
    if (taskInput) {
        taskInput.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                addTodoList();
            }
        });
    }
    
    // Настройка делегирования событий
    setupEventDelegation();
    
    renderTodolist();
    renderCategories();
    renderCategoriesList();
    updateTime();
});



// Делегирование событий
function setupEventDelegation() {
    document.addEventListener('click', (event) => {
        const target = event.target;

        // удаление и отметка как выполнено
        if (target.classList.contains("js-mark-complete")) {
            const todoId = target.dataset.todoId;
            console.log('Mark complete clicked:', todoId);
            markAsComplete(todoId);
        } else if (target.classList.contains("js-delete-todo")) {
            const todoId = target.dataset.todoId;
            deleteTodo(todoId)
        } else if (target.closest(".js-delete-category")) {
            const catId = target.closest(".js-delete-category").dataset.categoryId;
            deleteCategory(catId)
        }
    });

    // обработчики по наведению мышки на элемент
    const taskList = document.querySelector('.task-list');
    taskList.addEventListener('mouseover', (event) => {
        const todoItem = event.target.closest(".todo-item");
        if (todoItem) {
            const deleteBtn = todoItem.querySelector('.js-delete-todo');
            if (deleteBtn) {
                todoItem.classList.add('toDelete');
                deleteBtn.classList.add('show');
            }
        }
    });

    taskList.addEventListener('mouseout', (event) => {
        const todoItem = event.target.closest(".todo-item");
        if (todoItem) {
            const deleteBtn = todoItem.querySelector('.js-delete-todo');
            if (deleteBtn) {
                todoItem.classList.remove('toDelete');
                deleteBtn.classList.remove('show');
            }
        }
    });


    // для классификации задач
    const categoryList = document.getElementById("category-list-for-classification");
    categoryList.addEventListener('click', (event)=>{
        const target = event.target;
        
        if (target.closest(".classification-category")){
            handleFilterClick(target.closest(".classification-category"));
        }
    })

}




