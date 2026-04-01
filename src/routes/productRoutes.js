const {Router} = require('express');
const ProductController = require('../controllers/ProductController');
const authMiddleware = require('../middlewares/authMiddleware');
const routes = Router();

routes.get('/products', ProductController.index);
routes.post('/products', authMiddleware, ProductController.create);

module.exports = routes;