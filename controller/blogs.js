const User = require('../models/users')
const Blogs = require('../models/blogs')



const getAllBlogs = async (req, res) =>{
	try{
		let blogs = await Blogs.find({}).sort(req.query.sort)
		return res.json({'nbHits' : blogs.length, blogs})
	}catch(error) {
		return res.json({'msg' : error})
	}
}

const getSingleBlog  = async (req, res) => {
	const blogId = req.params.blogId
	try{
		let blog = await Blogs.findById(blogId)
		return res.json({blog})
	}catch(error){
		return res.json({'msg' : error})
	}

}

const searchBlog = async (req, res) => {
	const {title,content,createdBy, tags, sort, select} = req.query;
	const search_obj = {}
	if(title) search_obj.title = {$regex: title , $options: 'i'}
	if (content) search_obj.content = {$regex : content, $options : 'i'}	
	if(tags) search_obj.tags = {$regex : tags, $options : 'i'}

	let sorted;
	if (sort){
		//sort is now string with comma separated values but mongoose sort() method will not accept comma so remove comma and make it as a single string without comma
		sorted = sort.split(',').join(' ')
	} else {
		sorted = " "
	}

	let selected;
	if(select){
		selected = select.split(',').join(' ')
	}else {
		
		selected = " "
	}
			
	let page = req.query.page || 1
	let limit = req.query.limit || 2
	let skip = (page -1) * limit 

	try {
		let result = await Blogs.find(search_obj).sort(sorted).select(selected).skip(skip).limit(limit)
		return res.json({result})
	} catch (error) {
		return res.json({error})	
	}
}


const createBlog = async (req, res) => {
	
	req.body.createdBy = req.user.userId
	try {
		let blog = await Blogs.create({...req.body})
		return res.json({'blog' : blog})
	}
	catch(error) {
		return res.json({'msg' : error})
	}
}


const updateBlog = async (req, res) => {
	const {blogId} = req.params
	const {userId} = req.user


	try{
		let blog = await Blogs.findOneAndUpdate({_id : blogId, createdBy : userId},{...req.body}, {new : true, runValidator : true})

		return res.json({blog})
	}catch(error) {
		return res.json({error})
	}
}

const deleteBlog = async (req, res) => {
	try{
		let is_delete = await Blogs.deleteOne({_id : req.params.blogId, createdBy : req.user.userId})
		
		return res.json({"msg":is_delete})

	}catch(error) {
		return res.json({error})
	}
}


module.exports = {
	getAllBlogs,
	getSingleBlog,
	updateBlog,
	deleteBlog,
    createBlog,
	searchBlog
}


