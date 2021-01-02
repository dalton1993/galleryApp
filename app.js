var express = require("express");
var app = express();
app.use(express.static(__dirname + "/public")); 
app.set("view engine", "ejs"); 
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
const PORT = process.env.PORT || 3000; 
const mongoose = require('mongoose');
const session = require("express-session"); 
const MongoStore = require('connect-mongo')(session);
var Campground = require("./models/campground"); 
const campground = require("./models/campground");
var passport = require("passport");
var LocalStrategy = require("passport-local"); 
User = require("./models/user");
seedDB = require("./seeds");
var methodOverride = require("method-override"); 
app.use(methodOverride("_method")); 
const MONGOURI = 'mongodb+srv://dalton:c7ntBw8yO7xtx0lv@cluster0.jjiue.mongodb.net/gallarydb?retryWrites=true&w=majority';
const secret = process.env.SECRET || "the answer my friend is blowing in the wind"; 
// seedDB();

var campgroundRoutes = require("./routes/campground");
var commentRoutes = require("./routes/comments");
var authRoutes = require("./routes/auth");

const store = new MongoStore({
	url: MONGOURI,
	secret: secret,
	touchAfter: 24 * 60 * 60   
});

store.on("err", (e) => {
	console.log("session error", e)
})

app.use(session({
	store:store,
	secret: secret,
	resave: false,
	saveUninitialized: false
}));
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next(); 
});
app.use(passport.initialize());
app.use(passport.session());
app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(authRoutes); 
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
const Comment = require("./models/comment");

mongoose.connect(process.env.MONGOURI || MONGOURI, {
  	useNewUrlParser: true,
	useUnifiedTopology: true
	})
	.then(() => console.log('Connected to DB!'))
	.catch(error => console.log(error.message));


app.listen(PORT, function(){
	console.log("Server is listening on " + PORT);
});