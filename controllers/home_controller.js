const Post = require('../models/posts');
const User = require('../models/user');
module.exports.home =  async function(req,res){
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
    try{
    let posts = await Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
   
       let users = await User.find({});
        return res.render('home',{
            title: "Home",
            posts:posts,
            all_users: users
             
        });
    
   
}catch(err){
    console.log('Error',err);
    return ;
}
}
