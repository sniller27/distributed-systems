$(document).ready(function(){
	//GLOBAL VARIABLES
	var artists = [];

	//artist search field
	var artistsearch = '#artistsearch';
	var artisttabletbody = '#artisttable tbody';

	//UPDATE TABLE
	function updateTable(artistlist, tablerefresh){
		var artistsearchword = $(artistsearch).val();
	    var tabledata = "";

		for (var i = 0; i < artistlist.length; i++) {

			if (artistlist[i].name.includes(artistsearchword)) {
				tabledata += "<tr>";
				for (var key in artistlist[i]) {
				  if (artistlist[i].hasOwnProperty(key)) {
				    // console.log(key + " -> " + artistlist[i][key]);
				    if (key == 'favoriteArtist') {
				    	var ischecked = "";
				    	if (artistlist[i][key] == true) {
				    		ischecked = " checked";
				    	}
				    	tabledata += "<td><input type='checkbox' value='"+artistlist[i][key]+"' id='"+artistlist[i]['id']+"'"+ischecked+"></td>";
				    }else {
				    	tabledata += "<td>"+artistlist[i][key]+"</td>";
				    }
				  }
				}
				tabledata += "</tr>";
			}
		}
	    $(tablerefresh).html(tabledata);
	}

	//DETECT TABLE CHANGE
	$(artisttabletbody).change(function(e){
		var chagedartistid = $(e.target).get(0).id;
		// console.log(chagedartistid);
		var currentbool = artists[chagedartistid-1].favoriteArtist;
		// console.log(artists[chagedartistid-1].favoriteArtist);
		artists[chagedartistid-1].favoriteArtist = !currentbool;
	});

	//NEW ARTIST (client-side)
    $("#addartistform").submit(function(){
    	artistname = $('#artistnamefield').val();
    	var artistbplace = $('#artistbirthplacefield').val();
    	var artistbday = $('#artistbirthdatefield').val();
    	var artistfavorite = $('#artistfavoritecheckbox').is(':checked');
		

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
		    updateTable(artists, artisttabletbody);

		    console.log(JSON.stringify(artists));
		    //return prevents site reload
		    return false;
		

	});

	//SEARCH
	$(artistsearch).keyup(function(){
	    updateTable(artists, artisttabletbody);
	});
});