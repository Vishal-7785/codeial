const Post = require('../models/posts');
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
    Post.find({}).populate('user').exec(function(err,posts){
        return res.render('home',{
            title: "Home",
             posts:posts,
             
        });
    });
   
}
