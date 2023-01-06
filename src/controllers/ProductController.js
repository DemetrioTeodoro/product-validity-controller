const Query = require('../database/Query');
const Product = require('../models/Product');
const UserSession = require('../session/UserSession');
const { VIEWS, RESPONSE } = require('../utils/Constants');
const query = new Query(Product);

const formatProductObject = (product) => {
    if (product) {
        return { 
            id: product._id,
            name: product.name,
            amount: product.amount,
            expirationDate: new Date(product.expirationDate).toISOString().substring(0, 10)
        };
    }
}

const formatProductObjects = (products) => {
    if (products.length > 0) {
        return products.map(product => ({ 
                id: product._id,
                name: product.name,
                amount: product.amount,
                expirationDate: new Date(product.expirationDate).toISOString().substring(0, 10)
            }
        ));
    }
}

module.exports = {

    /**
     * Redirect to login
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async sendLogin(req, res) {
        res.render(VIEWS.LOGIN, { title: 'Login', stylePath: 'login.css', icon: 'tab-login.png' });
    },

    /**
     * Find Users
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async sendProducts(req, res) {
        try {

            const products = await query.find();

            if (!UserSession.haveSessionUser()) {
                res.render(VIEWS.LOGIN, { title: 'Login', stylePath: 'login.css', icon: 'tab-login.png' });
                return;
            }

            const productsInCorrectFormat = formatProductObjects(products);
            console.log('productsOnFormat ', productsInCorrectFormat);

            res.render(VIEWS.PRODUCT, 
                { 
                    title: 'Produtos',
                    stylePath: 'product.css',
                    icon: 'tab-stock.png',
                    products: productsInCorrectFormat,
                    productsToJs: JSON.stringify(productsInCorrectFormat),
                    showNavBar: true
                }
            );

        } catch (error) {
            console.log('ProductController sendProducts: ', error);
            res.status(RESPONSE.STATUS.ERROR).json({ msg: RESPONSE.MESSAGE.ERROR });
        }
    },

    /**
     * Find User by id
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
     async findProductById(req, res) {
        try {
            const { id } = req.params;

            const product = await query.findById(id);

            if (!UserSession.haveSessionUser()) {
                res.render(VIEWS.LOGIN, { title: 'Login', stylePath: 'login.css', icon: 'tab-login.png' });
                return;
            }

            res.status(RESPONSE.STATUS.OK).json(formatProductObject(product));

        } catch (error) {
            console.log('ProductController findProductById: ', error);
            res.status(RESPONSE.STATUS.ERROR).json({ msg: RESPONSE.MESSAGE.ERROR });
        }
    },

    /**
     * Save or update a Product
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async saveOrUpdateProduct(req, res) {
        const { id, name, amount, expirationDate } = req.body;

        if (!name || !amount || !expirationDate) {
            res.status(RESPONSE.STATUS.NO_PARAMS).json({ msg: 'Necessário dados para consulta' });
            return;
        }

        try {

            const updatedOrCreatedProduct = await query.saveOrUpdate({
                id,
                name,
                amount,
                expirationDate
            });

            if (updatedOrCreatedProduct) {
                const products = await query.find();
                const productsInCorrectFormat = formatProductObjects(products);

                res.render(VIEWS.PRODUCT, { title: 'Produtos', stylePath: 'product.css', icon: 'tab-stock.png', products: productsInCorrectFormat, showNavBar: true, });
                return;
            }

            res.render(VIEWS.LOGIN, { title: 'Login', stylePath: 'login.css', icon: 'tab-login.png' });

        } catch (error) {
            console.log('ProductController saveOrUpdateProduct: ', error);
            res.status(RESPONSE.STATUS.ERROR).json({ msg: RESPONSE.MESSAGE.ERROR });
        }
    },

    /**
     * Delete a Product
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
     async deleteProduct(req, res) {
        const { id } = req.params;
console.log('id ', id);
        if (!id) {
            res.status(RESPONSE.STATUS.ERROR).json({ msg: 'Necessário dados para consulta' });
            return;
        }

        try {

            const deletedProduct = await query.delete(id);
            console.log('deletedProduct ', deletedProduct);
            
            if (!!deletedProduct) {
                console.log('deletedProduct ', deletedProduct);
                const products = await query.find();
                console.log('products ', products);
                const productsInCorrectFormat = formatProductObjects(products);
                console.log('productsInCorrectFormat ', productsInCorrectFormat);
                res.render(VIEWS.PRODUCT, { title: 'Produtos', stylePath: 'product.css', icon: 'tab-stock.png', products: productsInCorrectFormat, showNavBar: true });
                return;
            }

            res.render('login', { title: 'Login', stylePath: 'login.css', icon: 'tab-login.png' });

        } catch (error) {
            console.log('ProductController deleteProduct: ', error);
            res.status(RESPONSE.STATUS.ERROR).json({ msg: RESPONSE.MESSAGE.ERROR });
        }
    },

}