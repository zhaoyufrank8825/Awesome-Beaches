var mongoose = require("mongoose");

var campSchema = new mongoose.Schema({
	name: String,
	price: String,
	img: String,
	desc: String,
	comments:[
		{
			type:mongoose.Schema.Types.ObjectId,
			ref:"Comment"
		}
	],
	author: {
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref: "user"
		},
		username: String
	}
});
module.exports = mongoose.model("Camp", campSchema);