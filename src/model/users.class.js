import User from './user.class';
import {
    getDBUsers,
    getDBUser,
    addDBUser,
    removeDBUser,
    changeDBUser,
    changeDBUserPassword
} from '../services/users.api';

export default class Users {
    constructor() {
        this.data = [];
    }

    async populate() {
        const initialData = await getDBUsers();
        this.data = initialData.map(userData => new User(userData.id, userData.nick, userData.email, userData.password));
    }

    async addUser(userData) {
        const newId = this.data.length ? Math.max(...this.data.map(user => user.id)) + 1 : 1;
        const newUser = new User(newId, userData.nick, userData.email, userData.password);
        this.data.push(newUser);
        return newUser;
    }

    async removeUser(id) {
        await removeDBUser(id);
        this.data = this.data.filter(user => user.id !== id);
    }

    async changeUser(updatedUser) {
        const index = this.getUserIndexById(updatedUser.id);
        if (index === -1) {
            throw new Error(`No se ha encontrado el usuario con ID: ${updatedUser.id}`);
        }
        const user = this.data[index];
        user.nick = updatedUser.nick;
        user.email = updatedUser.email;
        user.password = updatedUser.password;
        const modifiedUser = new User(user.id, user.nick, user.email, user.password);
        this.data[index] = modifiedUser;
        return modifiedUser;
    }

    async changeUserPassword(id, newPassword) {
        const userIndex = this.getUserIndexById(id);
        if (userIndex === -1) {
            throw new Error(`No se ha encontrado el usuario con ID: ${id}`);
        }
        const user = this.data[userIndex];
        user.password = newPassword;
        const updatedUser = new User(user.id, user.nick, user.email, user.password);
        this.data[userIndex] = updatedUser;
        return updatedUser;
    }

    async getUserById(id) {
        const user = this.data.find(user => user.id === id);
        if (!user) {
            throw new Error(`No se ha encontrado el usuario con ID: ${id}`);
        }
        return user;
    }

    getUserIndexById(id) {
        const index = this.data.findIndex(user => user.id === id);
        if (index === -1) throw new Error('No se ha encontrado el usuario');
        return index;
    }

    getUserByNickName(nick) {
        const user = this.data.find(user => user.nick === nick);
        if (!user) throw new Error('No se ha encontrado el Usuario');
        return user;
    }
}
