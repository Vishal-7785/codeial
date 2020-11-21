module.exports.index = function(req,res){
    return res.json(200,{
        message: "Sahil is chutiya",
        comments: []
    });
}