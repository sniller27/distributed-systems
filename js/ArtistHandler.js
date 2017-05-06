//Artist array
var artists = [];

//Artist class
var Artist = function(artistname, artistbplace, artistbday, artistfavorite){
	var favoritebool = artistfavorite ? true : false;
	this.id = artists.length + 1;
	this.name = artistname;
	this.birthPlace = artistbplace;
	this.birthDate = artistbday;
	this.favoriteArtist = favoritebool;
}

//Add artist function
function addArtist(artistname, artistbplace, artistbday, artistfavorite){
	var artist = new Artist(artistname, artistbplace, artistbday, artistfavorite);
	artists.push(artist);
}