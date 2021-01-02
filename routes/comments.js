var express = require("express");
var router = express.Router(); 
var Campground = require("../models/campground");
const Bucket = require("../models/bucket");
var Comment = require("../models/comment");
const { route } = require("./campground");
var middleware = require("../middleware");
const bucket = require("../models/bucket");




//==================
//Comments Routes
//==================

router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id)
		.then( campground => {
			bucket.findOne({'author.id':req.user})
			.then( bucketExists => {
				res.render("comments/new", {
					campground:campground, 
					currentUser: req.user,
					bucket:bucketExists
				});
			})
			.catch( err => {
				console.log(err);
			})
		})
		.catch( err => {
			console.log(err);
		})
	}); 

router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			Comment.create(req.body.comment , function(err, newComment){
				if(err){
					console.log(err)
				} else {
					newComment.author.id = req.user._id;
					newComment.author.username = req.user.username;
					newComment.save(); 
					campground.comments.push(newComment);
					campground.save(); 
					res.redirect("/campgrounds/" + campground._id); 
				}
			}); 
		}
	});
});

/*router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect('back');
		} else {
			res.render("comments/edit" , {campground_id: req.params.id, comment: foundComment, currentUser: req.user});
		}
	});
}); */

router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
	Comment.findById(req.params.comment_id)
	.then( foundComment => {
		bucket.findOne({"auhtor.id":req.user})
		.then( bucketExists => {
			res.render("comments/edit" , {
				campground_id: req.params.id, 
				comment: foundComment, 
				currentUser: req.user,
				bucket:bucketExists
			})
		})
		.catch( err => {
			console.log(err);
		})
	})
	.catch(err=>{
		console.log(err);
	})
})

router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back"); 
		} else {
			res.redirect("/campgrounds/" + req.params.id); 
		}
	});
});

router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndDelete(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/" + req.params.id); 
		}
	});
});



module.exports = router; 