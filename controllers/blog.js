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
router.get('/:id', (req, res) => {
	Blog.findById(req.params.id, (err, foundBlog) => {
		res.render('blog/show.ejs', {
			blog: foundBlog
		});
	});
});




module.exports = router;