var express = require("express"); 
var router = express.Router();
var Campground = require("../models/campground");
const Bucket = require("../models/bucket"); 
var middleware = require("../middleware"); 
const user = require("../models/user");
const bucket = require("../models/bucket");

router.get("/", function(req, res){
	res.redirect("/campgrounds"); 
});

router.get("/campgrounds", middleware.isLoggedIn, function(req, res){
	Campground.find({})
	.sort('-createdAt')
	.exec( (err, campgrounds) => {
		if(err){
			console.log("error");
		} else {
			Bucket.findOne({"author.id":req.user})
			.then( bucketExists => {
				console.log(bucketExists)
				res.render("campgrounds/index", {
					campgrounds:campgrounds, 
					currentUser: req.user,
					bucket:bucketExists
				});
			}); 
		};
	});
});
//================
//New
//================
router.post("/campgrounds", middleware.isLoggedIn, function(req, res){
	var name = req.body.name;
	var image = req.body.image; 
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};

	var newCampground = {
		name: name, 
		image: image, 
		description:desc, 
		author:author
	}; 

	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log("error");
		} else {
			res.redirect("/campgrounds"); 
		}
	}); 	
});

router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res){
	Bucket.findOne({"author.id":req.user})
	.then( bucketExists => {
		res.render("campgrounds/new", {
			currentUser: req.user,
			bucket:bucketExists
		});
	})
});
//==============
//Show
//==============

router.get("/campgrounds/:id", middleware.isLoggedIn, (req, res) => {
	Campground.findById(req.params.id)
	.populate("comments")
	.populate("author")
	.then( (foundCampground) => {
		Campground.find({"author.id":foundCampground.author.id})
		.then( (allUserPosts) => {
			Bucket.findOne({"author.id":req.user._id})
			.then( (bucket) => {
				res.render("campgrounds/show", {
					campground: foundCampground, 
					currentUser: req.user,
					bucket: bucket, 
					posts: allUserPosts
				}); 
			})
		})
		.catch( (err) => {
			console.log(err)
		})
	})
});

/*router.get("/campgrounds/:id", function(req, res){
	Campground.findById(req.params.id)
	.populate("comments")
	.populate("author")
	.exec( (err, foundCampground) => {
		if(err){
			console.log("something went wrong!");
		} else {
            console.log(foundCampground.author); 
			res.render("campgrounds/show", {campground: foundCampground, currentUser: req.user}); 
		}
	}); 
}); */

router.get('/user/:id', middleware.isLoggedIn, (req, res) => { 
	Campground.find( {'author.id': req.params.id} )
	.then((userCampgrounds) => {
		User.findById(req.params.id)
		.then( user => {
			Bucket.find({"author.id":req.user})
			.then( bucketExists => {
				res.render("campgrounds/user",{
					postData:userCampgrounds, 
					userData:user,
					currentUser: req.user,
					bucket:bucketExists
				})
			});
		})
		.catch( (err) => {
			console.log(err)
		})
	})
	.catch( (err) => {
		console.log(err)
	});
});

//==============
//Bucket
//==============


router.post("/bucket/:userid/add-to-bucket/:postid", (req, res) => {
	Bucket.findOne({"author.id":req.params.userid})
	.then( (userBucket) => {
		if(!userBucket || userBucket === null){
			console.log(userBucket)
			const posts = req.params.postid;
			const author = req.params.userid;
		
			const bucket = new Bucket({
				posts:posts,
				"author.id":author
			})
			bucket.save()
			.then( result => { 
				res.redirect("/campgrounds/" + req.params.postid);
			})
		} else {

			const bucketItemExists = userBucket.posts.find( (item) => item == req.params.postid);

			if(!bucketItemExists){

				Bucket.findOneAndUpdate({ "author.id":req.params.userid },{
					$push: { posts: [ req.params.postid ] }
				})
				.then( (newBucket)=> {
					res.redirect("/campgrounds/" + req.params.postid);
				})
				.catch( (err) => {
					console.log(err)
				})
			} else {
				res.status(400).json({message:err}) 
			}
		}
	})
});

router.post("/bucket/:userid/remove-from-bucket/:postid", (req, res) => {
	Bucket.findOneAndUpdate({"author.id":req.params.userid}, {
		$pull: { posts: req.params.postid }
	})
	.then( (newBucket) => {
		res.redirect("/campgrounds/" + req.params.postid);
	})
	.catch((err) => {
		console.log(err)
	})
})

router.get('/bucket/:userid', middleware.isLoggedIn, (req, res) => {
	Bucket.findOne({"author.id": req.params.userid})
	.populate("posts", "name image description author")
	.then( (userBucket) => {
		if(userBucket !== null){
		res.render("campgrounds/bucket",{
			bucket: userBucket.posts,
			currentUser: req.user
		})
		} else {
			res.redirect("back");
		}
	})
	.catch( (err) => {
		console.log(err)
	});
});

//===============
//Edit Route
//===============

router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
		Campground.findById(req.params.id)
			.then(foundCampground => {
				Bucket.findOne({"author.id":req.user})
				.then( bucketExists => {
					res.render("campgrounds/update", {
						campground: foundCampground, 
						currentUser: req.user,
						bucket: bucketExists
					});
				})
			});	
		});
		



//==============
//Update Route (post)
//==============

router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res){
	var data = {
		name: req.body.name,
		image: req.body.image,
		description: req.body.description
	}; 
	Campground.findByIdAndUpdate(req.params.id, data, function(err, update){
		if(err){
			console.log("err");
			res.redirect("/campgrounds");
		}
		res.redirect("/campgrounds/" + req.params.id); 
	}); 
});

//==================
//Delete
//==================

router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership,  function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect('/campgrounds'); 
		} else {
			res.redirect("/campgrounds");
		}
	});
}); 





		
module.exports = router; 