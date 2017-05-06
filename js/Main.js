$(document).ready(function(){

	/**
		VARIABLES
	**/
	//Artist array
	var artists = [];

	//selector variables
	var artistsearch = '#artistsearch';
	var artisttabletbody = '#artisttable tbody';
	var addartistform = '#addartistform';
	//form variables
	var $form = $(addartistform);
	var $successMsg = $(".alert");
	//artist id's
	var artistid = 0;

	/** 
		EVENTS
	**/
	//On addartistform submission
	$form.validator().on("submit", function(e){
	  if(!e.isDefaultPrevented()){
	    e.preventDefault();
	    $successMsg.fadeIn('100').delay('3000').fadeOut('100');;
	    createNewArtist();
	  }
	});

	//Search for artist
	$(artistsearch).keyup(function(){
	    updateTable(artists, artisttabletbody);
	});

	//Updates artist list on table change
	$(artisttabletbody).change(function(e){
		var chagedartistid = $(e.target).get(0).id;
		var currentbool = artists[chagedartistid-1].getFavoriteArtist();
		console.log("current bool: " + currentbool);
		artists[chagedartistid-1].setFavoriteArtist(!currentbool);
	});

	/** 
		METHODS
	**/
	//Creates new artist
    function createNewArtist(){
    	var artistname = $('#artistnamefield').val();
    	var artistbplace = $('#artistbirthplacefield').val();
    	var artistbday = $('#artistbirthdatefield').val();
    	var artistfavorite = $('#artistfavoritecheckbox').is(':checked');
		
	    addArtist(artistname, artistbplace, artistbday, artistfavorite);
	    updateTable(artists, artisttabletbody)
	    clearForm();

	    //return false prevents site reload
	    return false;
	};

	//Add artist function
	function addArtist(artistname, artistbplace, artistbday, artistfavorite){
		artistid++;
		var artist = new Artist(artistid, artistname, artistbplace, artistbday, artistfavorite);
		console.log(artist.getName());
		artists.push(artist);
	}

	//Update artist table
	function updateTable(artistlist, tablerefresh){
		var artistsearchword = $(artistsearch).val();
	    var tabledata = "";

		for (var i = 0; i < artistlist.length; i++) {
			var getartistname = artistlist[i].getName();
			console.log("artist name: " + getartistname);
			if (getartistname.includes(artistsearchword)) {
				tabledata += "<tr>";
				for (var key in artistlist[i]) {
					//not completely dynamic solution
				  if (artistlist[i].hasOwnProperty(key) && key != 'setFavoriteArtist') {
				  	var artistfunction = eval("artistlist[i]['" + key + "']()");
				    if (key == 'getFavoriteArtist') {
				    	var ischecked = "";
				    	if (artistlist[i].getFavoriteArtist() == true) {
				    		ischecked = " checked";
				    	}
				    	tabledata += "<td><input type='checkbox' value='"+artistfunction+"' id='"+artistlist[i].getId()+"'"+ischecked+"></td>";
				    }else {
				    	tabledata += "<td>"+artistfunction+"</td>";
				    }
				  }
				}
				tabledata += "</tr>";
			}
		}
	    $(tablerefresh).html(tabledata);
	}

	//Clear form
	function clearForm(){
		$(addartistform).find('input:text, input[type=date]').val('');
    	$(addartistform).find('input[type=checkbox]').prop('checked', false);
	}

});