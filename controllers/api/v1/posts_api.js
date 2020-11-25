// const Post = require('../../../models/post');
// const Comment = require('../../../models/comments')
// module.exports.index = async function(req,res){

//     let posts = await Post.find({})
//     .populate('user')
//     .populate({
//         path:'comments',
//         populate:{
//             path:'user'
//         }
//     })
   
//     return res.json(200,{
//         message: "List of posts",
//         posts:posts
//     });
// }

// module.exports.destroy = async function(req,res){
//     try{
//         let post = await Post.findById(req.params.id);
//         // .id means converting the object id( req.user._id )into string
//         // if(post._id == req.params.id){
//             post.remove();
//             await Comment.deleteMany({post: req.params.id});
//             // req.flash('success','Post and associated comments deleted');
//                 return res.json(200,{
//                     message: "Post and associated commments deleted successfully"
//                 });
//         // }
//         // else{
//         //     return res.redirect('back');
//         // }

//     }catch(err){
//         // req.flash('error',err);
//         return res.json(500,{
//             message: "Interval server error"
//         })
//     }
    

// }

const Post = require('../../../models/posts');
const Comment = require('../../../models/comments');
module.exports.index = async function(req, res){


    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

    return res.json(200, {
        message: "List of posts",
        posts: posts
    })
}


module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});


    
            return res.json(200, {
                message: "Post and associated comments deleted successfully!"
            });
            }else{
              return res.json(401,{
                  message: "You can not delete this post"
              });
          }

    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
    
}

