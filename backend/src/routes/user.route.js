const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/', userController.register);
router.post('/login', userController.login);
router.get('/', userController.findAll);
router.put('/', userController.update);
router.delete('/:id', userController.delete);
router.get('/verify', userController.verify);
router.get('/forget-password', userController.forgotPassword);
router.get('/reset-password', userController.resetPassword);
router.get('/change-password', userController.changePassword);

//friends
router.post('/friend-requests', userController.friendRequest);
router.post('/friend-requests/:id', userController.findAllFriendRequestById);
router.get('/friend-list', userController.findAllFriendRequest);
router.get('/friend-list/:id', userController.findAllFriendRequest);

router.get('/:id', userController.findByPk);


module.exports = router;