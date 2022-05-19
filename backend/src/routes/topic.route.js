const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topic.controller');

router.post('/', topicController.create);

router.put('/', topicController.update);

router.get('/', topicController.findAll);

router.get('/:id', topicController.findByPk);

router.delete('/:id', topicController.delete);

module.exports = router;
