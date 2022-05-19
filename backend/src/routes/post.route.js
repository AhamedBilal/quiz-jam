const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');

router.post('/', postController.create);

router.put('/', postController.update);

router.get('/', postController.findAll);

router.get('/:id', postController.findByPk);

router.delete('/:id', postController.delete);

module.exports = router;
