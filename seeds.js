var Camp = require("./models/campgrounds");
var mongoose = require("mongoose");
var Comment = require("./models/comments");


var camps = [
	{
		name: "Maui",
		img: "https://travel.usnews.com/dims4/USNEWS/1f0270e/2147483647/resize/445x280%5E%3E/crop/445x280/quality/85/?url=https://travel.usnews.com/images/2016-main-getty-cropped_445x280_HzgMOMV.jpg",
		desc: "Travelers flock to Maui for its bounty of beautiful island beaches. The expansive shores of Wailea Beach and Kaanapali Beach are classics that shouldn't be missed, while smaller Napili Beach and Hookipa Beach Park are better for those seeking a more low-key experience. Whether your beach style is big or small, you cannot leave this Hawaiian island without visiting Waianapanapa State Park, a protected area that boasts striking black sands and lush tropical foliage throughout."
	},
	{
		name: "Outer Banks",
		img: "https://travel.usnews.com/dims4/USNEWS/11f833d/2147483647/resize/445x280%5E%3E/crop/445x280/quality/85/?url=https://travel.usnews.com/images/main_cropped_445x280_JRydtwn.jpg",
		desc: "The beaches in North Carolina's Outer Banks span more than 100 miles, meaning there is plenty of room for you and your family to spread out. The shores at Hatteras Island are ideal for fishing and boating. Meanwhile, the beaches in Kitty Hawk and Kill Devil Hills offer optimal conditions for surfing and skimboarding, as they see more waves than the beaches farther south."
	},
	{
		name: "Destin",
		img: "https://travel.usnews.com/dims4/USNEWS/5d84bb5/2147483647/resize/445x280%5E%3E/crop/445x280/quality/85/?url=https://travel.usnews.com/images/main-2016_445x280_RUDrE3A.jpg",
		desc: 'Situated on the Florida Panhandle, Destin boasts miles of picturesque white sand beaches. The Shores at Crystal Beach Park is a pristine spot for swimming and lounging, while Henderson Beach State Park and Grayton Beach State Park offer nature trails on top of beautiful white sand shores. And thanks to a thriving underwater population, Destin is often called the "World Luckiest Fishing Village."'
	},
	{
		name: "Kauai",
		img: "https://travel.usnews.com/dims4/USNEWS/63137a8/2147483647/resize/445x280%5E%3E/crop/445x280/quality/85/?url=https://travel.usnews.com/images/gettyimages-155150590_XEX2Eun.jpg",
		desc: "Kauai's many wild, untouched landscapes mean visitors can expect to enjoy unique beach experiences while on this Hawaiian island. For unforgettable views of the famous Napali coastline, hit up Polihale State Park, Tunnels Beach and Ke'e Beach. Hanalei Bay also offers excellent mountain vistas and is a prime resort area on the island, perfect for those who want direct access to amenities without sacrificing scenery. Consider planning a summer trip for the best swimming conditions, as Kauai's waters can be dangerously rough in winter."
	}
];

function seedDB(){
	Camp.deleteMany({}, function(err){
		// if(err){
		// 	console.log(err)
		// }else{
		// 	// console.log("Removed the compgrounds")
		// 	Comment.deleteMany({}, function(err){
		// 		if(err){
		// 			console.log(err)
		// 		}else{
		// 			// console.log("Removed the comments")
		// 			camps.forEach(function(campground){
		// 				Camp.create(campground, function(err, newcamp){
		// 					if(err){
		// 						console.log(err)
		// 					}else{
		// 						// console.log("Add a new campground")
		// 						Comment.create({
		// 							text: "This is a very good comment",
		// 							author: "Myself"
		// 						}, function(err, comment){
		// 							if(err){
		// 								console.log(err)
		// 							}else{
		// 								newcamp.comments.push(comment)
		// 								newcamp.save()
		// 								// console.log("Add a new comment")
		// 							}
		// 						})
		// 					}
		// 				})
						
		// 			})
		// 		}
		// 	})
		// }		
	})
}

module.exports = seedDB
