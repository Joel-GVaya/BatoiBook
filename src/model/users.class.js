class Users {
    constructor() {
        this.data = [];
    }

    populate(usersArray) {
        this.data = usersArray.map(userData => new User(userData.id, userData.nick, userData.email, userData.password));
    }

}
