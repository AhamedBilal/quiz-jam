const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authenticate = require('../middlewares/auth.middleware');


router.post('/', userController.register);
router.post('/login', userController.login);
router.get('/', authenticate, userController.findAll);
router.get('/token', authenticate, userController.findByToken);
router.put('/', authenticate, userController.update);
router.delete('/:id', authenticate, userController.delete);
router.get('/verify', userController.verify);
router.get('/forget-password', userController.forgotPassword);
router.get('/reset-password', authenticate, userController.resetPassword);
router.get('/change-password', authenticate, userController.changePassword);

//friends
router.post('/friend-requests', authenticate, userController.friendRequest);
router.post('/friend-requests/:id', authenticate, userController.findAllFriendRequestById);
router.get('/friend-list', authenticate, userController.findAllFriendRequest);
router.get('/friend-list/:id', authenticate, userController.findAllFriendRequest);

router.get('/:id', authenticate, userController.findByPk);


module.exports = router;