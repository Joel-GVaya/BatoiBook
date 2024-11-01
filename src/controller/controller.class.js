import Books from "../model/books.class.js";
import Modules from "../model/modules.class.js"
import Users from "../model/users.class.js";
import View from "../view/view.class.js";
import Cart from "../model/cart.class.js"

export default class Controller {

    constructor() {
        this.model = {
            modules: new Modules(),
            users: new Users(),
            books: new Books(),
            cart: new Cart()
        }
        this.view = new View();
    }

    async init() {
        await Promise.all([
            this.model.modules.populate(),
            this.model.users.populate(),
            this.model.books.populate()
        ])


        this.view.renderModulesSelect(this.model.modules.data)
        this.model.books.data.forEach(book => this.view.renderBook(book, this.handleActionBook.bind(this)))
        this.view.setBookSubmitHandler(this.handleSubmitBook.bind(this))

    }

    async handleSubmitBook(payload) {
        if (payload.id){
            console.log('Se edita libro')
            try {
                const book = await this.model.books.changeBook(payload);
                this.view.renderEditedBook(book);
                this.view.renderMessage("info", 'Libro editado correctamente');
            } catch (error) {
                console.log(error);
            }
        }else {
            console.log('Se crea un nuevo libro')
            try {
                const book = await this.model.books.addBook(payload);
                this.view.renderBook(book, this.handleActionBook.bind(this));
                this.view.renderMessage("info", 'Libro añadido correctamente');
            } catch (error) {
                console.log(error);
            }
        }
    }
    

    handleRemoveBook(id) {
        this.model.books.removeBook(id)
        this.view.renderRemoveBook(id)
        this.view.renderMessage('info', 'Libro con id ' + id + ' eliminado correctamente')
    }

    handleCartBook(id) {
        this.model.cart.addItem(this.model.books.getBookById(id))
        this.view.renderMessage("info", 'Libro añadido al carrito correctamente')
    }

    handleEditBook(id) {
     const book = this.model.books.getBookById(id)
     this.view.renderEditBook(book)
    }

    handleActionBook(action, id) {
        switch (action) {
            case "cart":
                console.log('carrito')
                this.handleCartBook(id);
                break;
            case "delete":
                if (confirm('Desea eliminar el libro con id: ' + id + '?')) {
                    console.log('Se va a eliminar el libro')
                    this.handleRemoveBook(id)
                }
                break;
            case "edit":
                console.log('editar')
                this.handleEditBook(id);
                break;
            default:
                console.log("No se sabe que hacer " + id)
        }

    }
}