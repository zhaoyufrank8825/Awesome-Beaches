var express = require("express"),
	router = express.Router({mergeParams: true}),
	passport = require("passport"),
	User = require("../models/users"),
	Camp = require("../models/campgrounds"),
	Comment = require("../models/comments"),
	middleware = require("../middleware")



router.get("/new", middleware.isLoggedin, function(req, res){
	Camp.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err)
		}else{
			res.render("comments/new", {campground : campground})
		}
	})
})

router.post("/", middleware.isLoggedin, function(req, res){
	Camp.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err)
		}else{
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err)
				}else{
					comment.author.id = req.user._id
					comment.author.username = req.user.username
					comment.save()
					
					campground.comments.push(comment)
					campground.save()
					req.flash("success", "Great Job, you post a new comment successfully.")
					res.redirect("/campgrounds/"+campground._id)
				}
			})
		}
	})
})


router.get("/:comment_id/edit", middleware.isOwnComment, function(req, res){
	Camp.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err)
		}else{
			Comment.findById(req.params.comment_id, function(err, comment){
				if(err){
					console.log(err)
				}else{
					res.render("comments/edit", {campground : campground, comment: comment})
				}
			})
		}
	})
})

router.put("/:comment_id", middleware.isOwnComment, function(req, res){
	Camp.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err)
		}else{
			Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment){
				if(err){
					console.log(err)
				}else{
					req.flash("success", "Great Job, you updated this comment successfully.")
					res.redirect("/campgrounds/"+campground._id)
				}
			})
		}
	})
})

router.delete("/:comment_id", middleware.isOwnComment, function(req, res){
	Comment.findByIdAndDelete(req.params.comment_id, function(err){
		if(err){
			console.log(err)
		}else{
			req.flash("success", "Great Job, you deleted a comment successfully.")
			res.redirect("/campgrounds/"+req.params.id)
		}
	})
})



module.exports = router;
