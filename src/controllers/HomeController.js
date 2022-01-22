const User = require('../models/User');
const mongoose = require('mongoose');

module.exports = {

    /**
     * Salva um novo User
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async sendHome(req, res) {

        const updatedUser = await User.find();

        console.log('USER '+[Array.from(updatedUser)]);

        // const t = [
        //     {
        //         id: 1,
        //         name: 'Pedro'
        //     },
        //     {
        //         id: 2,
        //         name: 'Pedro 2'
        //     },
        //     {
        //         id: 3,
        //         name: 'Pedro 3'
        //     },
        // ]

        res.render('home', { title: 'Home', updatedUser, datas: updatedUser, showNavBar: true });
    },

}