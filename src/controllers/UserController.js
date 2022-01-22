const User = require('../models/User');
const mongoose = require('mongoose');

module.exports = {

    /**
     * Salva um novo User
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async sendLogin(req, res) {

        res.render('login', { title: 'Cadastro', stylePath: 'login.css', showNavBar: false });
    },

    /**
     * Busca um novo User
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async saveUser(req, res) {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).send({ msg: 'Necessário dados para consulta' });
            return;
        }

        try {

            console.log('HERE ', username, password);
            const updatedUser = await User.findOne({
                username,
                password
            });
            console.log('updatedUser ', updatedUser);


            res.render('home', { title: 'FUNFOU', showNavBar: true, user: updatedUser });
        } catch (error) {
            console.log('UserController findById: ', error);
            res.status(400).send({ msg: 'Ops, ocorreu um erro.' });
        }
    },

}