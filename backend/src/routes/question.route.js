const express = require('express');
const router = express.Router();
const questionController = require('../controllers/question.controller');

router.post('/', questionController.create);

router.put('/', questionController.update);

router.get('/', questionController.findAll);

router.get('/:id', questionController.findByPk);

router.delete('/:id', questionController.delete);

module.exports = router;
