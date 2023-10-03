const mongoose = require('mongoose');


// define the schema 

const blogSchema = mongoose.Schema({
	title : {
		type: String, 
		required: [true, "please provide the title"],
		minlength : [3, "title must be minimum of 3 characters long"],
		maxlength : [200, "title can't be more than 200 characters long"]
	}, 
	content : {
		type: String,
		required: [true, "Please provide the content "],
		minlength : [10, "Content must be minimum of 10 characters long"]
	},
	tags : {
		type: [],
	},
	createdBy : {
		type: mongoose.Types.ObjectId,
		refs: 'User',
		required: [true, "Please provide the user id"]
	}
}, {
	timestamps: true
})


const Blog =  mongoose.model('blogs', blogSchema)
module.exports = Blog;


