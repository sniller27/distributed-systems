	var artists = [];

var Artist = function(artistname, artistbplace, artistbday, artistfavorite){


	
	var favoritebool = artistfavorite ? true : false;
	//generate artist ID
	var genid = artists.length + 1;

	//could also have been an instance of a class?
	var artist = {
		id: genid,
		name:artistname, 
		birthPlace:artistbplace, 
		birthDate:artistbday, 
		favoriteArtist:favoritebool
	};
	this.artistarray = artists;

	/** METHODS **/
	//add to array
	this.addArtist = function(){
		artists.push(artist);
		console.log("pusher: " + artist);
	};
	//update table

    console.log(JSON.stringify(artists));

    this.getArtists = function() {
    	return this.artistarray;
	};

	// this.getArtists = this.artistarray;
}