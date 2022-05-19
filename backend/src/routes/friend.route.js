const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/auth.middleware');
const userController = require("../controllers/friend.controller");


router.get('/', authenticate, userController.findAllFriendRequest);
router.get('/:id', authenticate, userController.findAllFriendsById);

router.post('/request', authenticate, userController.friendRequest);
router.get('/request/:id', authenticate, userController.findAllFriendRequestById);

module.exports = router;