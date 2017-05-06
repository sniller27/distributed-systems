//Artist class
function Artist(artistid, artistname, artistbplace, artistbday, artistfavorite){
	var favoritebool = artistfavorite ? true : false;
	var id = artistid;
	var name = artistname;
	var birthPlace = artistbplace;
	var birthDate = artistbday;
	var favoriteArtist = favoritebool;

	this.getId = function(){
		return id;
	}

	this.getName = function(){
		return name;
	}

	this.getBirthPlace = function(){
		return birthPlace;
	}

	this.getBirthDate = function(){
		return birthDate;
	}

	this.getFavoriteArtist = function(){
		return favoriteArtist;
	}

	this.setFavoriteArtist = function(favorite){
		favoriteArtist = favorite;
	}
}
