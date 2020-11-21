const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);


router.post('/create', usersController.create);
///users/create-session
// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);


router.get('/sign-out', usersController.destroySession);

module.exports = router;

//u r using node or nodemom node but auto save is on....but server start nh hoti node se..tb hi tbse soch rha hu.ki q nh ho rha hai...w.aity...sir ka toh maine v follow kiya tha padhte time..aise scene nh tha..user auth hai fir v signin signup....bhaiya even aaj maine unka code tk copy paste kiya kyoki ye doubt 2 din se resolve ni ho paa raha tha to main apne code ko comment kiya or fir sir ka code niche paste kiya...aisa nh hota..paste jaise taise krne se..main jagah galat dekhna hota hai..krta hu....