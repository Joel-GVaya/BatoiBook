
function getBookById(libros, id) {
    const libro = libros.find(libro => libro.id === id);
    if (!libro) {
        throw new Error("No se ha encontrado el libro")
    } else {
        return libro;
    }
}

function getBookIndexById(libros, id) {

    const indexlibro = libros.findIndex(libro => libro.id === id);;
    if (indexlibro === -1) {
        throw new Error("No se ha encontrado el libro")
    } else {
        return indexlibro;
    }
}

function bookExists(libros, idUsuario, modulo){
        const libro = libros.find(libro => libro.moduleCode === modulo);
        if(libro){
        return libro.userId === idUsuario
        }else{
            return false
        }
}

function booksFromUser(libros, idUsuario) {
    return libros.filter(libro => libro.userId === idUsuario)
}

function booksFromModule(libros, modulo) {
    return libros.filter(libro => libro.moduleCode === modulo);
}


function booksCheeperThan(libros, valor){
    return libros.filter(libro => libro.price <= valor);
}

function booksWithStatus(libros, estado){
    return libros.filter(libro => libro.status == estado);
}

function averagePriceOfBooks(libros) {
    if (libros.length === 0) return '0.00 €';

    const precioTotal = libros.reduce((precio, libro) => precio + libro.price, 0);
    const precioMedio = precioTotal / libros.length;

    return precioMedio.toFixed(2) + " €";
}

function booksOfTypeNotes(libros){
    return libros.filter(libro => libro.publisher === "Apunts");
}

function booksNotSold(libros){
    return libros.filter(libro => libro.soldDate === "")
}

function incrementPriceOfbooks(libros, incremento) {
    return libros.map(libro => ({
        ...libro,
        price: parseFloat((libro.price * (1 + incremento)).toFixed(1)),
    }));
}

function getUserById(usuarios, id) {
    const usuario = usuarios.find(usuario => usuario.id === id);
    if (usuario) {
        return usuario;
    } else {
        throw new Error("No existe el usuario");
    }
}

function getUserIndexById(usuarios, id) {
    const usuario = usuarios.findIndex(usuario => usuario.id === id);
    if (usuario != -1) {
        return usuario;
    } else {
        throw new Error("No existe el usuario");
    }
}

function getUserByNickName(usuarios, nick) {
    const usuario = usuarios.find(usuario => usuario.nick === nick);
    if (usuario) {
        return usuario;
    } else {
        throw new Error("No existe el usuario");
    }
}

function getModuleByCode(modulos, code){
    const modulo = modulos.find(modulo => modulo.code === code);
    if(modulo){
        return modulo;
    }else{
        throw new Error("No se ha encontrado el modulo")
    }
}







export {
    getBookById,
    getBookIndexById,
    bookExists,
    booksFromUser,
    booksFromModule,
    booksCheeperThan,
    booksWithStatus,
    averagePriceOfBooks,
    booksOfTypeNotes,
    booksNotSold,
    incrementPriceOfbooks,
    getUserById,
    getUserIndexById,
    getUserByNickName,
    getModuleByCode
}