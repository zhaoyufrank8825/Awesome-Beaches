var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	Camp = require("./models/campgrounds"),
	Comment = require("./models/comments"),
	seedDB = require("./seeds"),
	User = require("./models/users"),
	passport = require("passport"),
	passportLocal = require("passport-local"),
	expressSession = require("express-session"),
	methodOverride = require("method-override"),
	flash = require("connect-flash")

var indexRouter = require("./routers/index"),
	campRouter = require("./routers/campgrounds"),
	commentRouter = require("./routers/comments")


mongoose.connect('mongodb://localhost/yelpcamp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

app.use(flash())
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// seedDB();

app.use(expressSession({
	secret:"This is zhao yu, I am a student in UTA",
	resave: false,
	saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new passportLocal(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
})


app.use("/", indexRouter)
app.use("/campgrounds", campRouter)
app.use("/campgrounds/:id/comments", commentRouter)


app.listen(3030, function(req, res){
	console.log("YelpCamp server is connected!");
});