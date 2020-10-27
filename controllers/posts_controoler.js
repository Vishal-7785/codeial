const Post = require('../models/posts');
const Comment = require('../models/comments');
module.exports.create = function(req,res){
    Post.create({
        content:req.body.content,
        user:req.user._id
    },function(err,post){
        if(err){
            console.log('Error in creating a post');
            return;
            
        }
        return res.redirect('back');
    });
}
module.exports.destroy = function(req,res){
    console.log(req.params.id)
    Post.findById(req.params.id,function(err,post){
        // .id means converting the object id( req.user._id )into string
        console.log(post);
        if(post._id == req.params.id){
            console.log('deleted');

            post.remove();
            Comment.deleteMany({post: req.params.id},function(err){
                if(err){
                    console.log('Error in deleting comments',err);
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

//post ya comments..kya dl
// post....sever kijiye browser pe
//iska server khn run rha hai ?
//8005//wo nh kon se terminal pe aapne 5-5 run kiya hua hai
// 4 pe.ok