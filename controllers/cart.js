const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const Menu = require('../models/menu')
const User = require('../models/user.js');

router.get('/', (req, res) => {
    if (!req.session.cart) {
        req.session.cart = {
            items: [],
            totals: 0.00,
            formattedTotals: ''
        };
    }
    Menu.find({ price: { '$gt': 0 } }).sort({ price: -1 }).limit(6).then(Menus => {
        Menu.forEach((menu) => {
            menu.formattedPrice = format.format(menu.price);
        });
        res.render('/cart.ejs', {
            menus: foundMenus,
        });

    }).catch(err => {
        res.status(400).send('Bad request');
    });

});

router.get('/cart', (req, res) => {
    const sess = req.session;
    const cart = (typeof sess.cart !== 'undefined') ? sess.cart : false;
    res.render('/cart', {
        cart: cart,
        menu: foundMenu
    });
});

router.post('/cart', (req, res) => {
    const qty = parseInt(req.body.qty, 10);
    const menu = parseInt(req.body.menu_id, 10);
    if (qty > 0 ) {
        Menus.findOne({ menu_id: menu }).then(menu => {
            const cart = (req.session.cart) ? req.session.cart : null;
            Cart.addToCart(menu, qty, cart);
            res.redirect('/cart');
        }).catch(err => {
            res.redirect('/');
        });
    } else {
        res.redirect('/');
    }
});

router.post('/cart/update', (req, res) => {
    let ids = req.body["product_id[]"];
    let qtys = req.body["qty[]"];
    if(req.session.currentUser) {
        let cart = (req.session.cart) ? req.session.cart : null;
        let i = (!Array.isArray(ids)) ? [ids] : ids;
        let q = (!Array.isArray(qtys)) ? [qtys] : qtys;
        Cart.updateCart(i, q, cart);
        res.redirect('/cart');
    } else {
        res.redirect('/');
    }
});

router.get('/checkout', (req, res) => {
    const sess = req.session;
    const cart = (typeof sess.cart !== 'undefined') ? sess.cart : false;
    res.render('checkout', {
        pageTitle: 'Checkout',
        cart: cart,
        checkoutDone: false,
    });
});


if (router.get('env') === 'development') {
    router.use((err, req, res, next) => {
        res.status(err.status || 500);
    });
}

module.exports = router;
