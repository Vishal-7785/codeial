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

        // if (post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});


    
            return res.json(200, {
                message: "Post and associated comments deleted successfully!"
            });
        // }else{
        //     req.flash('error', 'You cannot delete this post!');
        //     return res.redirect('back');
        // }

    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
    
}

//post creation ke time aapke database user post se related nh hai isliye error throw ho rha hai...database clear kijiye pahle...aap bina uthenticate ke kaise post kiye... Bhaiya jaisa wo arpan sir padha rahe waise hi kiya h..aap bottom task bar pin kijiye pahle...pin kr dijiye..n invisible ho jata hai toh bhut problem hoti hai.acha ...bhaiya ye laptop kuch hi din hue  liye to idea km h ..mujhe v macka idead nh..ok koi nh dekhta hu...ok