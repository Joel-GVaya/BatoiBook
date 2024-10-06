export default class Book {
    constructor({id, userId, moduleCode, publisher, price, pages, status, soldDate = '', photo = '', comments = ''}) {
        this.id = id;
        this.userId = userId;
        this.moduleCode = moduleCode;
        this.publisher = publisher;
        this.price = price;
        this.pages = pages;
        this.status = status;
        this.soldDate = soldDate;
        this.photo = photo;
        this.comments = comments;
    }

    toString() {
        return `Book: { id: ${this.id}, userId: ${this.userId}, moduleCode: ${this.moduleCode}, publisher: ${this.publisher}, price: ${this.price}, pages: ${this.pages}, status: ${this.status}, soldDate: ${this.soldDate}, photo: ${this.photo}, comments: ${this.comments}}`;
    }
}
