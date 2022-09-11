// Dependencies
const express = require('express');
const bcrypt = require('bcrypt');
const sessionsRouter = express.Router();
const User = require('../models/user.js');

const currentUser = {email:
"student334455@yahoo.com",
password:
"Abc1234"}

// New (login page)
sessionsRouter.get('/new', (req, res) => {
	res.render('sessions/new.ejs', {
        currentUser: req.session.currentUser 
    })
})

// Delete (logout route)
sessionsRouter.delete('/', (req, res) => {
    req.session.destroy((error) => {
        res.redirect('/');
    });
})

// Create (login route)
sessionsRouter.post('/', (req, res) => {
    // Check for an existing user
    User.findOne({
        email: req.body.email
    }, (error, foundUser) => {
        // send error message if no user is found
        if (!foundUser) {
            res.send(`Oops! No user with that email address has been registered.`);
        } else {
            // If a user has been found 
            // compare the given password with the hashed password we have stored
            const passwordMatches = bcrypt.compareSync(req.body.password, foundUser.password);

            // if the passwords match
            if (passwordMatches) {
                // add the user to our session
                req.session.currentUser = foundUser;

                // redirect back to our home page
                res.redirect('/');
            } else {
                // if the passwords don't match
                res.send('Oops! Invalid credentials.');
            }
        }
    });
});

sessionsRouter.get('/dashboard', (req, res) => {
    if (req.session.currentUser) {
    res.render('/dashboard.ejs', {
      currentUser: req.session.currentUser
    });
  } else {
  res.send('UNAUTHORIZED USER!  Please click the back button.')
    }
  });

// Export Sessions Router
module.exports = sessionsRouter