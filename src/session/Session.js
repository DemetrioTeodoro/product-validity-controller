class UserSession {

    constructor(username, password) {
        this.username = username,
        this.password = password
    }

    haveSessionUser() {
        if (this.username && this.password) {
            return true;
        }
        return false;
    }

    getSessionUser() {
        const user = {
            username: this.username,
            password: this.password
        }
        return user;
    }

    clearSessionUser() {
        this.username = '';
        this.password = '';
    }

}

module.exports = UserSession;