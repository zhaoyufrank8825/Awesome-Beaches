var express = require("express"),
	router = express.Router(),
	passport = require("passport"),
	User = require("../models/users")


//==============================
router.get("/", function(req, res){
	res.render("landing");
});

router.get("/login", function(req, res){
	res.render("login")
})

router.post("/login", passport.authenticate("local", {
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}), function(req, res){
})

router.get("/signup", function(req, res){
	res.render("signup")
})

router.post("/signup", function(req, res){
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if(err){
			console.log(err)
			req.flash("error", err.message)
			return res.redirect("/signup")
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Great Job, you sign up successfully.")
			res.redirect("/campgrounds")
		})
	})
})

router.get("/logout", function(req, res){
	req.logout()
	req.flash("success", "Great Job, you log out successfully.")
	res.redirect("/campgrounds")
})



module.exports = router;
