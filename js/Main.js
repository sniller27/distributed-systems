$(document).ready(function(){
	
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
    	var artistname = $('#artistnamefield').val();
    	var artistbplace = $('#artistbirthplacefield').val();
    	var artistbday = $('#artistbirthdatefield').val();
    	var artistfavorite = $('#artistfavoritecheckbox').is(':checked');
		
			//getting variables by passing parameters
	        // artistdata(artistname, artistbplace, artistbday, artistfavorite);
		    var artist = new Artist(artistname, artistbplace, artistbday, artistfavorite);
		    artist.addArtist();
		    console.log(artist);
		    console.log("get artists: " + artist.getArtists());
		    //let this one stay here for now since I don't know if it's possible to pass a function.
		    updateTable(artist.getArtists(), artisttabletbody);

		    //return prevents site reload
		    return false;
		

	});

	//SEARCH
	$(artistsearch).keyup(function(){
	    updateTable(artists, artisttabletbody);
	});
});