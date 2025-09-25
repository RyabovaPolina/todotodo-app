class TodoStore {
    constructor(){
        this.todoList = this.loadFromStorage('todolist') || []
        this.filter = 'all' 
    }

    sortTodos(list) {
        return [...list].toSorted((a,b) => a.completed - b.completed);
    }

    get allTodos() {
        return this.sortTodos(this.todoList);
    }

    setFilter(filter)
    {
        this.filter = filter;
    }

    get filteredTodos() {
        switch (this.filter) {
            case 'all':
                return this.sortTodos(this.todoList);
            case 'completed':
                return this.todoList.filter(todo => todo.completed);
            case 'active':
                return this.todoList.filter(todo => !todo.completed);
            default:
                // filterType - это ID категории
                console.log
                return this.todoList.filter(todo => todo.categoryId === this.filter);
        }
    }


    loadFromStorage(key){
        try{
            const data = localStorage.getItem(key)
            if (data){
                return JSON.parse(data)
            }
            else return null
        }
        catch(error){
            console.error(error.message);
            return null
        }
    }

    saveToStorage(key, data){
        try{
            localStorage.setItem(key, JSON.stringify(data))
        }
        catch(error){
            console.error(error.message)
        }
    }

    addTodo(todo){
        const newTodo = {...todo, id: (Date.now()).toString()}
        this.todoList.push(newTodo)
        this.saveToStorage('todolist', this.todoList);
    }

    removeTodo(todoId){
        const newTodoList = this.todoList.filter(todo=> todo.id !==todoId);
        this.todoList = newTodoList;
        
        this.saveToStorage('todolist', this.todoList);
    }

    updateTodo(todoId, updates) {
        const index = this.todoList.findIndex(todo => {
            console.log(typeof(todo.id));
            console.log(typeof(todoId))
            return todo.id === todoId.toString()
        })
        if (index !== -1) {
            this.todoList[index] = { ...this.todoList[index], ...updates };
            this.saveToStorage('todolist', this.todoList);
        }
    }

    getTodosByCategory(categoryId) {
    return this.sortTodos(
        this.todoList.filter(todo => todo.categoryId === categoryId)
    );
}

}

export const store = new TodoStore();
