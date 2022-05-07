const express = require('express');
const router = express.Router();
const userController = require('../controllers/category.controller');

router.post('/', userController.create);

router.put('/', userController.update);

router.get('/', userController.findAll);

router.get('/:id', userController.findByPk);

router.delete('/:id', userController.delete);

module.exports = router;
