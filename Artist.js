var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ArtistSchema = new mongoose.Schema({
    id: Number,
    name: String,
    birthPlace: String,
    birthDate: String,
    favoritebool: String
});

module.exports = mongoose.model('Artist', ArtistSchema);