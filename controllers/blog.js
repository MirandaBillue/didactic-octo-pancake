///Dependencies
const express = require('express');
const router = express.Router();
const Blog = require('../models/blog.js');
const User = require('../models/user.js');


///Routers
///Index
router.get('/', (req, res) => {
    Blog.find({}, (err, foundBlogs)=> {
        res.render('blog/index.ejs', {
            blogs: foundBlogs,
			currentUser: req.session.currentUser
        });
    });
});
///New
router.get('/new', (req, res)=> {
    res.render('blog/new.ejs', {
		currentUser: req.session.currentUser
	});
});
///Delete
router.delete('/:id', (req, res) => {
	Blog.findByIdAndRemove(req.params.id, () => {
		res.redirect('/blog')
	});
});
///Update
router.put('/:id', (req, res) => {
	Blog.findByIdAndUpdate(req.params.id, req.body, () => {
		res.redirect('/blog')
	});
});
///Create
router.post('/', (req, res) => {
	Blog.create(req.body, (err, createdBlog) => {
		res.redirect('/blog')
	});
});
///Edit
router.get('/:id/edit', (req, res) => {
	Blog.findById(req.params.id, (err, foundBlog) => {
		res.render('blog/edit.ejs', {
			blog: foundBlog,
			currentUser: req.session.currentUser
		});
	});
});
/// Show
router.get('/:id', (req, res) => {
	Blog.findById(req.params.id, (err, foundBlog) => {
		res.render('blog/show.ejs', {
			blog: foundBlog,
			currentUser: req.session.currentUser
		});
	});
});




module.exports = router;