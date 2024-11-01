export default class Cart {
    constructor() {
        this.data = [];
    }

    populate(){}

    getBookById(id) {
        return this.data.find(book => book.id === id) || {}
       
    }

    addItem(book) {
        if(this.getBookById(book.id).id){
            throw 'El libro con id ' + book.id + ' ya esta en el carrito'
        }
        const bookInCart = {...book}
        this.data.push(bookInCart)
    }

    //Falta terminar
    removeItem(id) {
        const index = this.data.findIndex((book) => book.id === id);
        if (index !== -1) {
            this.data.splice(index, 1);
            return true;
        }
        return false;
    }
    
}

