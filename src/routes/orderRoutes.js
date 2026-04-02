const {Router} = require('express');
const OrderController = require('../controllers/OrderController');
const authMiddleware = require('../middlewares/authMiddleware');
const routes = Router();

routes.post('/orders', authMiddleware, OrderController.create);
routes.get('/orders', authMiddleware, OrderController.index);

module.exports = routes;