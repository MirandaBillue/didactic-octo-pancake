require('dotenv').config()
///Dependencies
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require ('mongoose');
const app = express();
const db = mongoose.connection;
const menuController = require('./controllers/menu.js');
const blogController = require('./controllers/blog.js');

///Port
const PORT = process.env.PORT || 3000;

///Database
mongoose.connect(process.env.MONGODB_URI)

///Database Connection Error / success
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongod connected'));
db.on('disconnected', () => console.log('mongod disconnected'));


//Middleware
app.use(express.static('public'));
// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


/// Routes
app.use('/menu', menuController);
app.use('/blog', blogController);

app.get('/' , (req, res) => {
  res.render('index.ejs')
});

///Listener
app.listen(PORT, () => console.log('express is listening on:', PORT));

