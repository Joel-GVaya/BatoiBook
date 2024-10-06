import User from './user.class';

export default class Users {
    constructor() {
        this.data = [];
    }

    populate(initialData) {
        this.data = initialData.map(userData => new User(userData.id, userData.nick, userData.email, userData.password));
    }

    addUser(userData) {
        const newId = this.data.length ? Math.max(...this.data.map(user => user.id)) + 1 : 1;
        const newUser = new User(newId, userData.nick, userData.email, userData.password);
        this.data.push(newUser);
        return newUser;
    }

    removeUser(id) {
        const index = this.data.findIndex(user => user.id === id);
        if (index === -1) {
            throw new Error(`El usuario no existe`);
        }
        this.data.splice(index, 1);
    }

    changeUser(updatedUser) {
        const index = this.data.findIndex(user => user.id === updatedUser.id);
        if (index === -1) {
            throw new Error(`El usuario no existe`);
        }
        this.data[index] = updatedUser;
        return updatedUser;
    }
    
    toString() {
        return this.data.map(user => user.toString()).join('\n');
    }

    getUserById(id) {
        const user = this.data.find(user => user.id === id);
        if (!user) {
            throw new Error(`No se ha encontrado el usuario`);
        }
        return user;
    }

    getUserIndexById(id) {
        const index = this.data.findIndex(user => user.id === id);
        if (index === -1) {
            throw new Error(`No se ha encontrado el usuario`);
        }
        return index;
    }

    getUserByNickName(nick) {
        const user = this.data.find(user => user.nick === nick);
        if(!user){
            throw new Error('No se ha encontrado el Usuario');
        }
        return user;
    }

}
