{
    // method to submit the form data for new post using ajax

    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                let newPost = newPostDOM(data.data.post);
                $('#post-list-container>ul').prepend(newPost);
                },error: function(error){
                    consol.log(error.responseText);
                }
            });//try now 
// sign up pe jao to can not get user/ profile dikha raha h
        });

    }
    // method to create a post in DOM
    let newPostDOM = function(post){
        return $(`
        
        <li id ="post-${post._id}"> 
              <p>
                      <small>
                  <a  class = "delete-post-button" href =  "/posts/destroy/${post._id}">X</a>
                  </small>
             ${post.content}
                  <br> 
                  <small>
                ${post.user.name}
                  </small>
                  </p>  
                  <div class = "post-comments"> 
                      <form action="/comments/create" method="POST">
                      <input type="text" name="content" placeholder="Add a comment..." required> 
                      <input type="hidden" name="post" value = "${post._id}">
                      <input type="submit" value = "Add Comment">
                  </form>
                  <div class = "post-comments-list">
                      <ul id="post-comments-${post._id}">
                      </ul>
                  </div>
                  
                  </div>
       
              </li>
           `);
    }

    createPost();
}