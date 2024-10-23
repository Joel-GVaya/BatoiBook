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
        return `
        <div>
            <h3>Libro: ${this.id}</h3>
            <h4>Codigo: ${this.moduleCode}</h4>
            <h4>${this.publisher}</h4>
            <p>${this.pages} páginas</p>
            <p>Estado: ${this.status}</p>
            <p>${this.soldDate ? `Vendido el ${this.soldDate}` : 'En venta'}</p>
            <p>${this.comments || 'Sin comentario'}</p>
            <h4>${this.price} €</h4>
        </div>
        `;
    }


}
