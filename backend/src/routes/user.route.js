const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authenticate = require('../middlewares/auth.middleware');


router.get('/', authenticate, userController.findAll);
router.put('/', authenticate, userController.update);
router.delete('/:id', authenticate, userController.delete);
router.get('/:id', authenticate, userController.findByPk);


module.exports = router;