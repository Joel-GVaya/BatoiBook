import Book from './book.class';
import {
    getDBBooks,
    getDBBook,
    addDBBook,
    removeDBBook,
    changeDBBook
} from '../services/books.api';

export default class Books {
    constructor() {
        this.data = [];
        this.nextId = 0;
    }

    async populate() {
        const initialData = await getDBBooks();
        this.nextId = Math.max(...initialData.map(item => item.id), 0) + 1;
        this.data = initialData.map(item => new Book({ id: item.id, ...item }));
    }

    async addBook(bookData) {
        const newBook = new Book({bookData});
        const addedBook = await addDBBook(bookData);
        this.data.push(newBook);
        return newBook;
    }


    async removeBook(bookId) {
        await removeDBBook(bookId);
        this.data = this.data.filter(book => book.id !== bookId);
        return bookId;
    }

    async changeBook(updatedBookData) {
        const updatedBook = await changeDBBook(updatedBookData);
        const index = this.getBookIndexById(updatedBook.id);
        const modifiedBook = new Book(updatedBook);
        this.data[index] = modifiedBook;
        return modifiedBook;
    }

    bookExists(id, moduleCode) {
        return this.data.some(book => book.id === id && book.moduleCode === moduleCode);
    }


    getBookById(bookId) {
        const book = this.data.find(book => book.id === bookId);
        if (!book) {
            throw new Error(`No se ha encontrado el libro con ID: ${bookId}`);
        }
        return book;
    }


    getBookIndexById(bookId) {
        const index = this.data.findIndex(book => book.id === bookId);
        if (index === -1) throw new Error('No se ha encontrado el libro');
        return index;
    }

    incrementPriceOfbooks(percent) {
        this.data = this.data.map(book => {
            book.price = parseFloat((book.price * (1 + percent)).toFixed(2));
            return book;
        });
    }

    booksNotSold() {
        return this.data.filter(book => book.status !== 'sold');
    }

    booksOfTypeNotes() {
        return this.data.filter(book => book.moduleCode === 'ABCD');
    }

    averagePriceOfBooks() {
        if (this.data.length === 0) return '0.00 €';

        const total = this.data.reduce((acc, book) => acc + book.price, 0);
        const average = total / this.data.length;
        return `${average.toFixed(2)} €`;
    }

    booksWithStatus(status) {
        return this.data.filter(book => book.status === status);
    }

    booksCheeperThan(price) {
        return this.data.filter(book => book.price < price);
    }

    booksFromModule(moduleCode) {
        return this.data.filter(book => book.moduleCode === moduleCode);
    }

    booksFromUser(userId) {
        return this.data.filter(book => book.userId === userId);
    }
}
