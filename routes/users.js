const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/users_controllers');
router.get('/profile', passport.checkAuthentication,usersController.profile);
router.get('/signup',usersController.signup);
router.get('/signin',usersController.signin);
router.post('/create',usersController.create)
// Using passport as a middleware to authenticate
router.post('/createSession',passport.authenticate(
    // This local tells that we have used local authentiation
    'local',
    {
        failureRedirect: '/users/signin'
    },
),usersController.createSession);
module.exports = router;