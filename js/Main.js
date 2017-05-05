$(document).ready(function(){

	//selector variables
	var artistsearch = '#artistsearch';
	var artisttabletbody = '#artisttable tbody';

	//Update artist table
	function updateTable(artistlist, tablerefresh){
		var artistsearchword = $(artistsearch).val();
	    var tabledata = "";

		for (var i = 0; i < artistlist.length; i++) {
			if (artistlist[i].name.includes(artistsearchword)) {
				tabledata += "<tr>";
				for (var key in artistlist[i]) {
				  if (artistlist[i].hasOwnProperty(key)) {
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

	//Updates artist list on table change
	$(artisttabletbody).change(function(e){
		var chagedartistid = $(e.target).get(0).id;
		var currentbool = artists[chagedartistid-1].favoriteArtist;
		artists[chagedartistid-1].favoriteArtist = !currentbool;
	});

	//New artist
    $("#addartistform").submit(function(){
    	var artistname = $('#artistnamefield').val();
    	var artistbplace = $('#artistbirthplacefield').val();
    	var artistbday = $('#artistbirthdatefield').val();
    	var artistfavorite = $('#artistfavoritecheckbox').is(':checked');
		
		    addArtist(artistname, artistbplace, artistbday, artistfavorite);
		    updateTable(artists, artisttabletbody);
		    clearForm();
		    //return false prevents site reload
		    return false;
	});

	//Search for artist
	$(artistsearch).keyup(function(){
	    updateTable(artists, artisttabletbody);
	});

	//Clear form
	function clearForm(){
		// $('#addartistform').reset();
	}
});