const Comment = require('../models/comments');
const Post = require('../models/posts');
module.exports.create = function(req,res){
Post.findById(req.body.post,function(err,post){
    if(post){
        Comment.create(
            {
                content:req.body.content,
                post:req.body.post,
                user: req.user._id
            },function(err,comment){
                if(err){
                    console.log('Error in creating user in signing up' ,err);
                    return;
                } 
                post.comments.push(comment);
                post.save();
             //return   res.redirect('/');
            }
        );
    }
   return res.redirect('back');

});
}
module.exports.destroy = function(req,res){
    console.log('dele');
    Comment.findById(req.params.id,function(err,comment){
        console.log(req.params.id);
        console.log(comment);
        if(comment.user==req.user.id || comment._id == req.params.id ){
            console.log('deleted');
            let postid = comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postid,{$pull:{comments:req.params.id}},function(err,post){
                if(err){
                    console.log('Error in deleting a post');
                    return res.redirect('back');
                }
                return res.redirect('back');

            });

            
        }
        else{
            return res.redirect('back');

        }
    });
}