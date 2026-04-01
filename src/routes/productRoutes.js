const {Router} = require('express');
const ProductController = require('../controllers/ProductController');
const authMiddleware = require('../middlewares/authMiddleware');
const routes = Router();

routes.get('/products', ProductController.index);
routes.get('/products/:id', ProductController.show);
routes.post('/products', authMiddleware, ProductController.create);
routes.put('/products/:id', authMiddleware, ProductController.update);
routes.delete('/products/:id', authMiddleware, ProductController.delete);

module.exports = routes;