var artists = [];


function artistdata(artistname, artistbplace, artistbday, artistfavorite){
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

	//add to array
	artists.push(artist);
	//update table

    console.log(JSON.stringify(artists));
}