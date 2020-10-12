const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controllers');
router.get('/profile',usersController.profile);
router.get('/signup',usersController.signup);
router.get('/signin',usersController.signin);
router.post('/create',usersController.create)
router.post('/createSession')
module.exports = router;