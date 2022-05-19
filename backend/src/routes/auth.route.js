const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authenticate = require('../middlewares/auth.middleware');


router.post('/', authController.register);
router.post('/login', authController.login);
router.get('/token', authenticate, authController.findByToken);

router.get('/verify', authController.verify);
router.get('/forget-password', authController.forgotPassword);
router.get('/reset-password', authenticate, authController.resetPassword);
router.get('/change-password', authenticate, authController.changePassword);

module.exports = router;