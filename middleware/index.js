var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, foundCampground){
			if(err){
				console.log(err);
				res.redirect("/campgrounds"); 
			} else {
				if(foundCampground.author.id.equals(req.user._id)){
					next();
				} else {
					res.send("back");
				}
			}
		});
	} else {
		res.send("You do not have the credentials to edit this page"); 
	}
}; 


middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				console.log(err);
				res.redirect("back"); 
			} else {
				if(foundComment.author.id.equals(req.user._id)){
					next();
				} else {
					res.send("back");
				}
			}
		});
	} else {
		res.send("You do not have the credentials to alter this post"); 
	}
}; 

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
		return next(); 
	}
	res.redirect("/login"); 
}


module.exports = middlewareObj; 