var Camp = require("../models/campgrounds")
var Comment = require("../models/comments")

var middleObj = {}

middleObj.isOwnCamp = function(req, res, next){
	if( req.isAuthenticated()){
		Camp.findById(req.params.id, function(err, campground){
			if(err){
				res.redirect("back")
			}else{
				if(campground.author.id.equals(req.user._id)){
					next()
				}else{
					req.flash("error", "Error, you don't have the permission to do this.")
					res.redirect("back")
				}
			}
		})
	}else{
		res.redirect("back")
	}
}

middleObj.isOwnComment = function(req, res, next){
	if( req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, comment){
			if(err){
				res.redirect("back")
			}else{
				if(comment.author.id.equals(req.user._id)){
					next()
				}else{
					req.flash("error", "Error, you don't have the permission to do this.")
					res.redirect("back")
				}
			}
		})
	}else{
		res.redirect("back")
	}
}

middleObj.isLoggedin = function(req, res, next){
	if( req.isAuthenticated()){
		next()
	}else{
		req.flash("error", "Error, you have to login first.")
		res.redirect("/login")
	}
}

module.exports = middleObj