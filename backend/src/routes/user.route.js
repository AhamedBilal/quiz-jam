const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/', userController.register);

router.post('/login', userController.login);

router.get('/', userController.findAll);

router.get('/:id', userController.findOne);

router.put('/', userController.update);

router.delete('/:id', userController.delete);

module.exports = router;