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
                posts:post
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

//ek kaam kijiye..mujhe ye zip bnakar de dijiye..node_modules reomve krke zip bnaiyega....bghiutt time leggea aapke code me...git hub link se chalega kya usme bhi node modules ni h...haan chlega..me kl dekh dunga..abhi ke liye sorry..are It's ok bhaiya main link de de raha 

module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});


            if (req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }

            req.flash('success', 'Post and associated comments deleted!');

            return res.redirect('back');
        }else{
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');
        }

    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
    
}

