///Dependencies
const express = require('express')
const router = express.Router()
const Menu = require('../models/menu')
const User = require('../models/user.js')

///Routers
///Index
router.get('/', (req, res) => {
    Menu.find({}, (err, foundMenus) => {
    res.render('menu/index.ejs', {
        menus: foundMenus,
        currentUser: req.session.currentUser
       });
    });
});
///New
router.get('/new', (req, res) => {
    res.render('menu/new.ejs', {
        currentUser: req.session.currentUser
    });
});
///Delete
router.delete('/:id', (req, res) => {
    Menu.findByIdAndRemove(req.params.id, () => {
        res.redirect('/menu')
    });
});
///Update
router.put('/:id', (req, res) => {
    Menu.findByIdAndUpdate(req.params.id, req.body, () => {
        res.redirect('/menu')
    });
});
///Create
router.post('/', (req, res) => {
    Menu.create(req.body, (err, createdMenu) => {
        res.redirect('/menu')
        });
});
///Edit
router.get('/:id/edit', (req, res) => {
    Menu.findById(req.params.id, (err, foundMenu) => {
        res.render('menu/edit.ejs', {
            menu: foundMenu,
            currentUser: req.session.currentUser
        });
    });
});
///Show
router.get('/:id', (req, res) => {
    Menu.findById(req.params.id, (err, foundMenu) => {
        res.render('menu/show.ejs', {
            menu: foundMenu,
            currentUser: req.session.currentUser
        });
    })
});



module.exports = router;
