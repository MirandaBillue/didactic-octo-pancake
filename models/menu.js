const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    name: {type:String, required:true},
    description: String,
    image: String,
    price: Number,
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;