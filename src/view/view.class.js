/*
Al cargar la edicion del formulario no carga bien los modulos
Para ver cambios se ha de refrescar la pagina
*/
export default class View {
    constructor() {
        this.bookList = document.getElementById('list');
        this.about = document.getElementById('about');
        this.form = document.getElementById('form');
        this.bookForm = document.getElementById('bookForm');
        this.messages = document.getElementById('messages');
    }

    renderModulesSelect(modules) {
        const selectUI = document.getElementById("id-module");
        modules.forEach((module) => {
            const option = document.createElement('option');
            option.value = module.code;
            option.textContent = module.cliteral;
            selectUI.appendChild(option);
        });
    }

    renderBookInForm(book) {
        document.getElementById('book-id').value = book.id
        document.getElementById('id-module').value = book.module
        document.getElementById('publisher').value = book.publisher
        document.getElementById('price').value = book.price
        document.getElementById('pages').value = book.pages
        const statusElement = document.querySelector(`input[name="status"][value="${book.status}"]`);
        if (statusElement) {
            statusElement.checked = true;
        }

        document.getElementById('comments').value = book.comments
    }

    renderEmptyFormBook() {
        this.bookForm.querySelector("legend h3").textContent = "Añadir Libro"
        this.bookForm.querySelector("button[type='submit']").textContent = "Agregar"
        this.bookForm.request()
    }

    renderEditedBook(book) {
        const bookUI = document.querySelector(`[alt="Libro: ${book.id}"]`);
        
        if (bookUI) {
            bookUI.innerHTML = `
            <img src="${book.photo}" alt="Libro: ${book.id}">
            <div>
                <h3>${book.moduleCode} (${book.id})</h3>
                <h4>${book.publisher}</h4>
                <p>${book.pages} páginas</p>
                <p>Estado: ${book.status}</p>
                <p>${book.status === 'sold' ? `Vendido el ${book.solddate}` : 'En venta'}</p>
                <p>${book.comments}</p>
                <h4>${parseFloat(book.price).toFixed(2)}€</h4>
                <button class="carrito" onclick="">
                    <span class="material-icons">add_shopping_cart</span>
                </button>
                <button class="editar" id="edit-${book.id}" onclick="">
                    <span class="material-icons">edit</span>
                </button>
                <button class="delete" id="delete-${book.id}" onclick="">
                    <span class="material-icons">delete</span>
                </button>
            </div>`;
            
            bookUI.querySelector(`.carrito`).addEventListener('click', () => this.handleActionBook('cart', book.id));
            bookUI.querySelector(`.delete`).addEventListener('click', () => this.handleActionBook('delete', book.id));
            bookUI.querySelector(`.editar`).addEventListener('click', () => this.handleActionBook('edit', book.id));
        }
    }
    


    renderBook(book, callback) {
        const bookUI = this.printBook(book);
        bookUI.querySelector(`.carrito`).addEventListener('click', () => callback('cart', book.id));
        bookUI.querySelector(`.delete`).addEventListener('click', () => callback('delete', book.id));
        bookUI.querySelector(`.editar`).addEventListener('click', () => callback('edit', book.id));

        this.bookList.appendChild(bookUI);
    }

    printBook(book) {
        const bookUI = document.createElement('div');
        bookUI.className = 'card';

        const saleInfo = book.status === 'sold'
            ? `Vendido el ${book.solddate}`
            : 'En venta';

        bookUI.innerHTML = `
            <img src="${book.photo}" alt="Libro: ${book.id}">
            <div>
                <h3>${book.moduleCode} (${book.id})</h3>
                <h4>${book.publisher}</h4>
                <p>${book.pages} páginas</p>
                <p>Estado: ${book.status}</p>
                <p>${saleInfo}</p>
                <p>${book.comments}</p>
                <h4>${parseFloat(book.price).toFixed(2)}€</h4>
                <button class="carrito">
                    <span class="material-icons">add_shopping_cart</span>
                </button>
                <button class="editar">
                    <span class="material-icons">edit</span>
                </button>
                <button class="delete">
                    <span class="material-icons">delete</span>
                </button>
            </div>
        `;

        return bookUI;
    }


    renderMessage(type, message) {
        const messageUI = document.createElement('div')
        messageUI.className = `${type} alert alert-danger alert-dismissible`;
        messageUI.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="this.parentElement.remove()">x</button>
        `;

        this.messages.appendChild(messageUI)

        setTimeout(() => {
            messageUI.remove(); // Elimina el mensaje
        }, 3000);
    }

    setBookSubmitHandler(callback) {
        this.bookForm.addEventListener('submit', (event) => {
            event.preventDefault();
    
            const id = document.getElementById('book-id')?.value;
            const moduleCode = document.getElementById('id-module').value;
            const publisher = document.getElementById('publisher').value;
            const price = parseFloat(document.getElementById('price').value);
            const pages = parseInt(document.getElementById('pages').value, 10);
            const status = document.querySelector('input[name="status"]:checked')?.value;
            const comments = document.getElementById('comments').value;
    
            // Crear formData
            const formData = {
                moduleCode,
                publisher,
                price,
                pages,
                status,
                comments
            };
    
            // Si el ID tiene valor, agregarlo al formData
            if (id) {
                formData.id = id; // Agregar id al objeto existente
            }
    
            // Llama al callback con formData
            callback(formData);
        });
    }
    

    renderEditBook(book) {
        this.renderViewEditBook()
        this.renderBookInForm(book)
    }

    renderViewEditBook() {
        this.bookForm.querySelector("legend h3").textContent = "Editar Libro"
        this.bookForm.querySelector("button[type='submit']").textContent = "Cambiar"
        const idElement = document.querySelector('.id')
        idElement.classList.remove('id')
        idElement.classList.add('id1')
    }

    renderRemoveBook(id) {
        const bookUI = document.querySelector('[alt="Libro: ' + id)
        if (bookUI) {
            const contenedor = bookUI.closest('div')
            contenedor.remove();
        }
    }

}