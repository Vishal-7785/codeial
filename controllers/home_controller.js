const Post = require('../models/posts');
const User = require('../models/user');
module.exports.home =  function(req,res){
    // Post.find({},function(err,posts){
    //     if(err){
    //         console.log('error in rendering posts');
    //         return;
    //     }
    //      return res.render('home',{
    //         title: "Home",
    //          posts:posts
    //     });
    // });
    // Populating the user
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec(function(err,posts){
        User.find({},function(err,users){
        return res.render('home',{
            title: "Home",
            posts:posts,
            all_users: users
             
        });
    });
    });
   
}
