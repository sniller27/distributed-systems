$(document).ready(function(){
	
	/**
		VARIABLES
	**/
	//Artist array
	// var artists = [];

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
		console.log(delartistid);

	    var data = {};
		data.selectedid = delartistid;

	    $.ajax({
	        url: '/deleteartist',
	        // dataType: "jsonp",
	        data: JSON.stringify(data),
	        contentType: 'application/json',
	        type: 'POST',
	        // jsonpCallback: 'callback',
	        success: function (data) {
	            console.log('Success: ')
	            console.log(JSON.stringify(data));
	        },
	        error: function (xhr, status, error) {
	            console.log('Error: ' + error);
	        },
	    });

	    updateTable();

	});

	//Search for artist
	$(artistsearch).keyup(function(){
	    updateTable();
	});

	//Updates artist list on table change
	$(artisttabletbody).change(function(e){
		var chagedartistid = $(e.target).get(0).id;
		console.log(chagedartistid);

		var data = {};
		data.selectedid = chagedartistid;
		var idselector = '#' + data.selectedid;
		data.afavorite = $(idselector).is(":checked");

		console.log('id: ' + data.selectedid);
		console.log('check: ' + data.afavorite);

		$.ajax({
	        url: '/updateartist',
	        // dataType: "jsonp",
	        data: JSON.stringify(data),
	        contentType: 'application/json',
	        type: 'POST',
	        // jsonpCallback: 'callback',
	        success: function (data) {
	            console.log('Success: ')
	            console.log(JSON.stringify(data));
	        },
	        error: function (xhr, status, error) {
	            console.log('Error: ' + error);
	        },
	    });

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
		console.log('bool: ' + $('#addartistform').find('input[name="artistfavorite"]').is(":checked"));

	    $.ajax({
	        url: 'http://localhost:8080/addartist',
	        // dataType: "jsonp",
	        data: JSON.stringify(data),
	        contentType: 'application/json',
	        type: 'POST',
	        // jsonpCallback: 'callback',
	        success: function (data) {
	            console.log('Success: ')
	            console.log(JSON.stringify(data));
	        },
	        error: function (xhr, status, error) {
	            console.log('Error: ' + error);
	        },
	    });

	    updateTable()
	    clearForm();

	    //return false should also prevent site reload
	    return false;
	};

	//Update artist table
	function updateTable(){

		var artistsearchword = $(artistsearch).val();
		var artistsurl = "/artists?name="+artistsearchword;

		$.getJSON(artistsurl, function(result){

			var tabledata = "";

			$.each(result, function(i, field){

				//radio button
				var ischecked = field.favoritebool == 'true' ? " checked" : "";
				var artistid = field._id;

				tabledata += "<tr>";
			    tabledata += "<td>"+artistid+"</td>";
			    tabledata += "<td>"+field.name+"</td>";
			    tabledata += "<td>"+field.birthPlace+"</td>";
			    tabledata += "<td>"+field.birthDate+"</td>";
			    tabledata += "<td><input type='checkbox' value='"+field.favoritebool+"' id='"+artistid+"'"+ischecked+"></td>";
			    tabledata += "<td><button type='button' id="+artistid+" class='btn btn-danger removeartist'>Delete</button></td>";
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

});