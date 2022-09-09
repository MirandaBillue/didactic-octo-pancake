///Dependencies
const express = require('express');
const router = express.Router();
const Blog = require('../models/blog.js');

///Routers
///Index
router.get('/', (req, res) => {
    Blog.find({}, (err, foundBlog)=> {
        res.render('blog/index.ejs', {
            blogs: foundBlogs
        });
    });
});
///New
router.get('/new', (req, res)=> {
    res.render('blog/new.ejs');
});
///Delete


///Update

///Create
router.post('/', (req, res) => {
	Blog.create(req.body, (err, createdBlog) => {
		res.redirect('/blog');
	});
});
///Edit


/// Show





module.exports = router;