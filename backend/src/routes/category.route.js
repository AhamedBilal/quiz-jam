const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');

router.post('/', categoryController.create);

router.put('/', categoryController.update);

router.get('/', categoryController.findAll);

router.get('/topics', categoryController.findAllWithTopics);

router.get('/:id', categoryController.findByPk);

router.delete('/:id', categoryController.delete);

module.exports = router;
