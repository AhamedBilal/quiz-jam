const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');

router.post('/', commentController.create);

router.put('/', commentController.update);

router.get('/', commentController.findAll);

router.get('/:id', commentController.findByPk);

router.delete('/:id', commentController.delete);

module.exports = router;
