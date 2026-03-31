const {Router} = require('express');
const AuthController = require('../controllers/AuthController');
const routes = Router();

routes.post('/login', AuthController.login);

module.exports = routes;