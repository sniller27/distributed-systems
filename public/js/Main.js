$(document).ready(function(){
	
	/**
		VARIABLES
	**/

	//selector variables
	var artistsearch = '#artistsearch';
	var artisttabletbody = '#artisttable tbody';
	var addartistform = '#addartistform';
	//form variables (for Bootstrap validation)
	var $form = $(addartistform);
	var $successMsg = $(".alert");

	//populate table onload
	updateTable();

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

	//delete button click
	$("table").on("click", ".removeartist", function(e){

	    var delartistid = $(e.target).get(0).id;
	    var data = {};
		data.selectedid = delartistid;

	    ajaxRequests(data, 'DELETE');

	});

	//Search for artist
	$(artistsearch).keyup(function(){
	    updateTable();
	});

	//Updates artist list on table change
	$(artisttabletbody).change(function(e){
		var chagedartistid = $(e.target).get(0).id;

		var data = {};
		data.selectedid = chagedartistid;
		var idselector = '#' + data.selectedid;
		data.afavorite = $(idselector).is(":checked");

		ajaxRequests(data, 'PUT');

	});

	/** 
		METHODS
	**/
	//Creates new artist
    function createNewArtist(){
	    
		var data = {};
		data.aname = $('#addartistform').find('input[name="artistname"]').val();
		data.abirthplace = $('#addartistform').find('input[name="artistbirthplace"]').val();
		data.abirthdate = $('#addartistform').find('input[name="artistbirthdate"]').val();
		data.afavorite = $('#addartistform').find('input[name="artistfavorite"]').is(":checked");

	    ajaxRequests(data, 'POST');

	    clearForm();

	    //return false should also prevent site reload
	    return false;
	};

	//Update artist table
	function updateTable(){

		var artistsearchword = $(artistsearch).val();
		var artistsurl = "/api/artists?name="+artistsearchword;

		$.getJSON(artistsurl, function(result){

			var tabledata = "";

			$.each(result, function(i, field){

				//radio button
				var ischecked = field.favoritebool == 'true' ? " checked" : "";
				// var artistid = field._id;

				tabledata += "<tr>";
			    // tabledata += "<td>"+artistid+"</td>";
			    tabledata += "<td>"+field.id+"</td>";
			    tabledata += "<td>"+field.name+"</td>";
			    tabledata += "<td>"+field.birthPlace+"</td>";
			    tabledata += "<td>"+field.birthDate+"</td>";
			    tabledata += "<td><input type='checkbox' value='"+field.favoritebool+"' id='"+field.id+"'"+ischecked+"></td>";
			    tabledata += "<td><button type='button' id="+field.id+" class='btn btn-danger removeartist'>Delete</button></td>";
				tabledata += "</tr>";

			});

			$(artisttabletbody).html(tabledata);
		});
	
	}

	//Clear form
	function clearForm(){
		$(addartistform).find('input:text, input[type=date]').val('');
    	$(addartistform).find('input[type=checkbox]').prop('checked', false);
	}

	//Ajax method
	function ajaxRequests(data, type, callback){
		$.ajax({
	        url: '/api/artist',
	        data: JSON.stringify(data),
	        contentType: 'application/json',
	        type: type,
	        success: function (data) {
	            console.log('Success: ')
	            console.log(JSON.stringify(data));
	        },
	        error: function (xhr, status, error) {
	            console.log('Error: ' + error);
	        },
	    }).done(function(response) {
	        // callback(response);
	        console.log("done");
	        updateTable();
	    });
	}


});