import Book from './book.class';

export default class Books {
    constructor() {
        this.data = []; 
        this.nextId = 0;
    }

    populate(initialData) {
        this.nextId = Math.max(...initialData.map(item => item.id), 0) + 1;
        this.data = initialData.map(item => new Book({ id: item.id, ...item }));
    }
    
    addBook(bookData) {
        const newBook = new Book({ id: this.nextId++, ...bookData });
        this.data.push(newBook);
        return newBook;
    }

    removeBook(bookId) {
        const index = this.data.findIndex(book => book.id === bookId);
        if (index === -1) {
            throw new Error(`No de ha encontrado el libro`);
        }
        this.data.splice(index, 1);
    }

    changeBook(updatedBookData) {
        const index = this.getBookIndexById(updatedBookData.id);
        if (index === -1) {
            throw new Error(`No se ha encontrado el libro.`);
        }
        const updatedBook = new Book({ ...this.data[index], ...updatedBookData });
        this.data[index] = updatedBook;
        return updatedBook;
    }

    toString() {
        return this.data.map(book => book.toString()).join('\n');
    }
    
    getBookById(bookId) {
        const book = this.data.find(book => book.id === bookId);
        if (!book) {
            throw new Error(`No se ha encontrado el libro.`);
        }
        return book;
    }
    
    getBookIndexById(bookId) {
        const book = this.data.findIndex(book => book.id === bookId);
        if(book === -1){
            throw new Error('No se ha encontrado el libro');
        }
        return book;
    }

    bookExists(id, module) {
        return !!this.data.some(book => book.userId === id && book.moduleCode === module);
    }

    booksFromUser(userId) {
        return this.data.filter(book => book.userId === userId);
    }

    booksFromModule(module){
        return this.data.filter(book => book.moduleCode === module);
    }

    booksCheeperThan(number){
        return this.data.filter(book => book.price <= number);
    }

    booksWithStatus(status) {
        return this.data.filter(book => book.status === status);
    }

    averagePriceOfBooks() {
        if (this.data.length === 0) return '0.00 €';
        const totalPrice = this.data.reduce((sum, book) => sum + book.price, 0);
        const average = totalPrice / this.data.length;
        return `${average.toFixed(2)} €`;
    }

    booksOfTypeNotes() {
        return this.data.filter(book => book.publisher === 'Apunts');
    }

    booksNotSold() {
        return this.data.filter(book => book.soldDate === '');
    }

    incrementPriceOfbooks(percent) {
        this.data = this.data.map(book => {
            book.price = parseFloat((book.price * (1 + percent)).toFixed(2));
            return book;
        });
    }

    

}
