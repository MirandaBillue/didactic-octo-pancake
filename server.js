require('dotenv').config()
///Dependencies
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require ('mongoose');
const app = express();
const db = mongoose.connection;
const menuController = require('./controllers/menu.js');
const blogController = require('./controllers/blog.js');
const session = require('express-session');
const userController = require('./controllers/users');
const sessionsController = require('./controllers/sessions');

///Port
const PORT = process.env.PORT || 3000;

///Database
mongoose.connect(process.env.MONGODB_URI)

///Database Connection Error / success
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongod connected'));
db.on('disconnected', () => console.log('mongod disconnected'));


//Middleware
// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project
app.use(express.static(__dirname + '/public'));
app.use(
  session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false
  }));
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

/// Routes
app.use('/menu', menuController);
app.use('/blog', blogController);
app.use('/users', userController);
app.use('/sessions', sessionsController);

app.get('/', (req, res) => {
  if (req.session.currentUser) {
  res.render('dashboard.ejs', {
    currentUser: req.session.currentUser
  });
} else {
res.render('index.ejs', {
      currentUser: req.session.currentUser
      });
  }
});


///Listener
app.listen(PORT, () => console.log('express is listening on:', PORT));

