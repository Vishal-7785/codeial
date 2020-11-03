const Post = require('../models/posts');
const Comment = require('../models/comments');
module.exports.create = async function(req,res){
    try{ 
        let post = await Post.create({
        content:req.body.content,
        user:req.user._id
    });
    if(req.xhr){
        return res.status(200).json({
            data:{
                post:post
            },
            message: "Post Created!"
        });
    }
    req.flash('success','Post Published');
        return res.redirect('back');
    }catch(err){
        req.flash('error',err);
        return;
    }
   
}
module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);
        // .id means converting the object id( req.user._id )into string
        if(post._id == req.params.id){
            post.remove();
            await Comment.deleteMany({post: req.params.id});
            req.flash('success','Post and associated comments deleted');
                return res.redirect('back');
        }
        else{
            return res.redirect('back');
        }

    }catch(err){
        req.flash('error',err);
    }
    

}

