const session = {};

module.exports = {

    buildSession(username, password) {
        session.username = username,
        session.password = password
    },

    haveSessionUser() {
        console.log('SSSS ',session);
        if (session.username && session.password) {
            return true;
        }
        return false;
    },

    getSessionUser() {
        const userSession = {
            username: session.username,
            password: session.password
        }
        return userSession;
    },

    clearSessionUser() {
        session.username = '';
        session.password = '';
    }
}