$(document).ready(function(){

	/**
		VARIABLES
	**/
	//selector variables
	var artistsearch = '#artistsearch';
	var artisttabletbody = '#artisttable tbody';
	var addartistform = '#addartistform';
	//form variables
	var $form = $(addartistform);
	var $successMsg = $(".alert");

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
		var currentbool = artists[chagedartistid-1].favoriteArtist;
		artists[chagedartistid-1].favoriteArtist = !currentbool;
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

	//Clear form
	function clearForm(){
		$(addartistform).find('input:text, input[type=date]').val('');
    	$(addartistform).find('input[type=checkbox]').prop('checked', false);
	}
});