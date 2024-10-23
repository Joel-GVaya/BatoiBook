import './style.css';
import Books from './src/model/books.class';

export default class Controller {
    constructor() {
        this.books = new Books();
        this.books.populate().then(() => this.renderBookList());
        this.formAddBook = document.getElementById('anadirLibro');
        this.formAddBook.addEventListener('submit', this.handleAddBook.bind(this));
        this.formRemoveBook = document.getElementById('eliminarLibro');
        this.formRemoveBook.addEventListener('submit', this.handleRemoveBook.bind(this));

    }


    async handleAddBook(event) {
        event.preventDefault();

        const moduleCode = document.getElementById('id-module').value;
        const publisher = document.getElementById('publisher').value;
        const price = document.getElementById('price').value;
        const pages = document.getElementById('pages').value;
        const status = document.querySelector('input[name="estado"]:checked').value;
        const comments = document.getElementById('comments').value || '';
        const newBookData = {
            id: this.books.nextId.toString(),
            userId: 1,
            moduleCode,
            publisher,
            price,
            pages,
            status,
            comments,
            soldDate: '',
            photo: ''
        };

        try {
            const addedBook = await this.books.addBook(newBookData);
            this.renderBookList();
            this.showMessage('Libro añadido correctamente.');
        } catch (error) {
            console.error('Error añadiendo el libro:', error);
            this.showMessage('Error al añadir el libro.');
        }

        this.formAddBook.reset();
    }

    async handleRemoveBook(event) {
        event.preventDefault();
    
        const bookId = document.getElementById('libroEliminar').value;    
        if (isNaN(bookId)) {
            this.showMessage('Por favor, ingrese un ID válido.');
            return;
        }
    
        try {
            const removed = await this.books.removeBook(bookId);
            this.renderBookList();
            this.showMessage(`Libro con ID ${bookId} eliminado correctamente.`);
        } catch (error) {
            console.error('Error eliminando el libro:', error);
            this.showMessage('Error al eliminar el libro.');
        }
    }
    

    showMessage(message) {
        const messagesDiv = document.getElementById('messages');
        messagesDiv.textContent = message;
        setTimeout(() => {
            messagesDiv.textContent = '';
        }, 3000);
    }

    renderBookList() {
        const listDiv = document.getElementById('list');
        listDiv.innerHTML = '';
    
        this.books.data.forEach(book => {
            const bookHTML = `
                <div class="card">
                    ${book.toString()}
                </div>
            `;
    
            listDiv.innerHTML += bookHTML;
        });
    }
    

  
  
}

document.addEventListener('DOMContentLoaded', () => {
  const myController = new Controller();
});
