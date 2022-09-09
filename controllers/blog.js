///Dependencies
const express = require('express');
const router = express.Router();

///Routers
///Index
router.get('/', (req, res) => {
	res.render('blog/index.ejs');
});
///New
router.get('/new', (req, res)=> {
    res.render('blog/new.ejs');
});
///Delete


///Update

///Create


///Edit


/// Show





module.exports = router;