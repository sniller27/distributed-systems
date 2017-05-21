//mongoose makes it easier to communicate with mongodb
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

//making new mongoose schema
var ArtistSchema = new mongoose.Schema({
    id: Number,
    name: String,
    birthPlace: String,
    birthDate: String,
    favoritebool: String
});

//use the schema for a mongoose model and export it
module.exports = mongoose.model('Artist', ArtistSchema);