class CategorieStore {
    constructor(){
        this.categories = this.loadFromStorage('categories') || [{id:'1', title:'homework'}]
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

    addCategorie(categoryData) {
        const title = typeof categoryData === 'string' ? categoryData : categoryData.title;
        
        const newCategorie = {
            id: Date.now().toString(),
            title: title.trim()
        };
        
        this.categories.push(newCategorie);
        this.saveToStorage('categories', this.categories);
    }

    removeCategorie(categorieId){
        const newCategories = this.categories.filter(cat=> cat.id !==categorieId);
        this.categories = newCategories;
        
        this.saveToStorage('categories', this.categories);
    }
}


export const categoriesStore = new CategorieStore();
