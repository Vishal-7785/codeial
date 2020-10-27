
const User = require('../models/user');
module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,user){
        if(err){
            console.log('Error in finding user',err);
            return;
        }
        return res.render('user_profile',{
            title: "User Profile",
            profile_user: user
        });
    });
}
module.exports.signup = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title: "Codeial|Sign Up"
    });
}
module.exports.signin = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title: "Codeial|Sign In"
    });
}
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('Error in finding user in signing up');
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('Error in creating user in signing up');
                    return;
                } 
                return res.redirect('/users/signin');
            });
        }
        else{
            return res.redirect('back');
        }
    })
}
module.exports.createSession = function(req,res){
    return res.redirect('/');
}
module.exports.destroySession = function(req,res){
    req.logout();
    return res.redirect('/');
}
module.exports.update = async function(req,res){
    // we are passing req.body as this contains req.body.name and req.body.email for updating name and email
    try{
        if(req.user.id == req.params.id){
            await User.findByIdAndUpdate(req.params.id,req.body);
                return res.redirect('back');
        }else{
            return res.status(401).send('Unauthorised');
        }
    }catch{
        console.log('Error',err);
    }
    
}