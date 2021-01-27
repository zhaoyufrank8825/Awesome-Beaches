var express = require("express"),
	router = express.Router(),
	passport = require("passport"),
	User = require("../models/users"),
	Camp = require("../models/campgrounds"),
	middleware = require("../middleware")



router.get("/", function(req, res){
	Camp.find({}, function(err, camps){
		if(err){
			console.log(err)
		}else{
			res.render("campgrounds/index", {campgrounds: camps});
		}
	});
});

router.post("/", middleware.isLoggedin, function(req, res){
	var title = req.body.name;
	var imageurl = req.body.image;
	var price = req.body.price;
	var desc = req.body.desc;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	newcamp = {name:title, img:imageurl, desc: desc, author: author, price: price};
	Camp.create(newcamp, function(err, camps){
		if(err){
			console.log(err);
		}else{
			req.flash("success", "Good job, you create a grand new campground.")
			res.redirect("/campgrounds");
		}
	});	
});

router.get("/new", middleware.isLoggedin, function(req, res){
	res.render("campgrounds/new");
});

router.get("/:id", function(req, res){
	Camp.findById(req.params.id).populate("comments").exec(function(err, findcamp){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/show", {campground :findcamp});
		}
	})
});

router.get("/:id/edit", middleware.isOwnCamp, function(req, res){
	Camp.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err)
		}else{
			res.render("campgrounds/edit", {campground: campground})
		}
	})
})

router.put("/:id", middleware.isOwnCamp, function(req, res){
	Camp.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
		if(err){
			console.log(err)
		}else{
			req.flash("success", "Great Job, you updated this campground successfully.")
			res.redirect("/campgrounds/"+req.params.id)
		}
	})
})

router.delete("/:id", middleware.isOwnCamp, function(req, res){
	Camp.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log(err)
		}else{
			req.flash("success", "Great Job, you deleted a campground successfully.")
			res.redirect("/campgrounds")
		}
	})
})



module.exports = router;