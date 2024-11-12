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
        const validationErrors = this.validateBookForm(payload);

        if (validationErrors.length > 0) {
            validationErrors.forEach(error => this.view.renderMessage("error", error));
            return;
        }

        if (payload.id) {
            console.log('Se edita libro');
            try {
                const book = await this.model.books.changeBook(payload);
                if (book) {
                    this.view.renderEditedBook(book);
                    this.view.renderMessage("info", 'Libro editado correctamente');
                }else{
                    this.view.renderMessage("info", 'El modulo ya ha sido utilizado, no se puede volver a utilizar')
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log('Se crea un nuevo libro');
            try {
                const book = await this.model.books.addBook(payload);
                this.view.renderBook(book, this.handleActionBook.bind(this));
                this.view.renderMessage("info", 'Libro añadido correctamente');
            } catch (error) {
                console.log(error);
            }
        }
    }

    validateBookForm(payload) {
        const errors = [];

        if (payload.idModule === "- Selecciona un módulo -") {
            errors.push("El módulo es obligatorio.");
        }

        if (!payload.publisher || payload.publisher.trim() === "") {
            errors.push("La editorial es obligatoria.");
        }
s
        if (payload.price === undefined || payload.price === null || isNaN(payload.price) || payload.price <= 0) {
            errors.push("El precio es obligatorio, debe ser un número y mayor o igual que 0.");
        }


        if (payload.pages === undefined || payload.pages === null || isNaN(payload.pages) || payload.pages <= 0 || !Number.isInteger(Number(payload.pages))) {
            errors.push("El número de páginas es obligatorio, debe ser un número entero y mayor o igual que 0.");
        }

        if (!payload.status) {
            errors.push("El estado es obligatorio.");
        }

        return errors;
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