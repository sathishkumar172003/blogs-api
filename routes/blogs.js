const express = require('express')
const router = express.Router()

const blogController = require('../controller/blogs');

router.route('/').get(blogController.getAllBlogs)


router.route('/searchblog').get(blogController.searchBlog)

router.route('/create').post(blogController.createBlog)

router.route('/update/:blogId').patch(blogController.updateBlog)

router.route('/delete/:blogId').delete(blogController.deleteBlog)

router.route('/:blogId').get(blogController.getSingleBlog)

module.exports = router;

