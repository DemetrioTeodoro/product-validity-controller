const Query = require('../database/Query');
const Product = require('../models/Product');
const User = require('../models/User');
const UserSession = require('../session/UserSession');
const { VIEWS, RESPONSE } = require('../utils/Constants');
const ProductController = require('./ProductController');
const query = new Query(User);

module.exports = {

    /**
     * Send user to login
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async sendLogin(req, res) {
        res.render(VIEWS.LOGIN, { title: 'Login', stylePath: 'login.css', icon: 'tab-login.png' });
    },
    
    /**
     * Send save new user
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async sendSaveNewUser(req, res) {
        res.render(VIEWS.REGISTER_USER, { title: 'Register', icon: 'tab-login.png', showNavBar: true });
    },

    /**
     * Search a new User
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async verifyUser(req, res) {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(RESPONSE.STATUS.NO_CONTENT).send({ msg: 'Necessário dados para consulta' });
            return;
        }

        try {

            const findedUser = await query.findOneWithFilter({ username, password });

            if (findedUser) {
                UserSession.buildSession(username, password);
                delete findedUser.password;
                await ProductController.sendProducts(req, res);
                return;
            }
            console.log('findedProduct ', findedUser);

            res.render(VIEWS.LOGIN, { title: 'Login', stylePath: 'login.css', icon: 'tab-login.png' });

        } catch (error) {
            console.log('UserController findById: ', error);
            res.status(RESPONSE.STATUS.ERROR).send({ msg: RESPONSE.MESSAGE.ERROR });
        }
    },
    
    /**
     * Save or update a User
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async saveOrUpdateUser(req, res) {
        const { username, password } = req.body;
console.log('username, password ', username, password);
        if (!username || !password) {
            res.status(RESPONSE.STATUS.NO_CONTENT).send({ msg: 'Necessário dados para consulta' });
            return;
        }

        try {

            const updatedOrCreatedUser = await query.saveOrUpdate({
                username,
                password
            });

            if (updatedOrCreatedUser) {
                UserSession.buildSession(username, password);
                delete updatedOrCreatedUser.password;
                await ProductController.sendProducts(req, res);
                console.log('findedProduct func ', updatedOrCreatedUser);
                return;
            }
            console.log('findedProduct ', updatedOrCreatedUser);

            res.render(VIEWS.LOGIN, { title: 'Login', stylePath: 'login.css', icon: 'tab-login.png' });

        } catch (error) {
            console.log('UserController findById: ', error);
            res.status(RESPONSE.STATUS.ERROR).send({ msg: RESPONSE.MESSAGE.ERROR });
        }
    },

}