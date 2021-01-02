var express = require("express"); 
var router = express.Router();
var passport = require("passport"); 
var User = require("../models/user"); 
var middleware = require("../middleware");



//=======================
//Authentication Routes
//=======================

router.get("/register", function(req, res){
	res.render("register", {currentUser: req.user}); 
});

router.post("/register", function(req, res){
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if(err){
			console.log(err);
			res.render("register");
		}
			passport.authenticate("local")(req, res, function(){
			res.redirect("/campgrounds");
		});
	});
});

router.get("/login", function(req, res){
	res.render("login", {currentUser: req.user});
}); 

router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/",
		failureRedirect: "/login"
	}), 
	function(req, res){
}); 

//==============
//logout 
//==============

router.get("/logout", function(req,res){
	req.logout();
	res.redirect("/campgrounds"); 
});



module.exports = router; 