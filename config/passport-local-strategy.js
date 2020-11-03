const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
},
function(req,email,password,done){
    // Find a user and establish the identity
    User.findOne({email: email},function(err,user){
        if(err){
            req.flash('Error',err);
            return done(err);
        }
        if(!user || user.password != password){
            req.flash('error','Invalid username/password');
            return done(null,false);
        }
        return done(null, user);
    });
}

));
// Serializing the user to decide which key os to be kept in the session cookie
passport.serializeUser(function(user,done){
    done(null,user.id);
});
// Deserializing the user to fetch information about user from that cookie as you have only put id in the cookie
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in fetching user -->Passport');
            return done(err);
        }
        return done(null,user);
    });
});
passport.checkAuthentication = function(req,res,next){
// If the user is signed in then pass the request to the next controller action
    if(req.isAuthenticated()){
   return next();
    }
    return res.redirect('/users/signin');
}
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        // req.user contains current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user
    }
    next();
}
module.exports = passport;
// adding comment is not working